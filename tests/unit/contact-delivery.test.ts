import assert from "node:assert/strict";
import test from "node:test";
import { deliverContactMessage, type ContactMessage } from "../../src/lib/contact-delivery";
import { renderContactEmail } from "../../src/lib/contact-email";

const env = {
  SMTP_HOST: "smtp.example.test", SMTP_PORT: "587", SMTP_SECURE: "false",
  SMTP_USER: "test-user", SMTP_PASS: "test-password",
  CONTACT_TO: "portfolio@example.test", CONTACT_CC: "copy1@example.test,copy2@example.test", CONTACT_FROM: "sender@example.test",
};
const message: ContactMessage = { name: "QA Tester", email: "qa@example.test", phone: "+243812345678", subject: "Test request", message: "This message is synthetic and is never sent.", locale: "en" };

test("reports transport not configured without creating a transport", async () => {
  const result = await deliverContactMessage(message, {}, () => { throw new Error("must not create transport"); });
  assert.equal(result, "not_configured");
});

test("sends a validated message through an injected mock transport", async () => {
  let sent: unknown;
  const result = await deliverContactMessage(message, env, (config) => {
    assert.equal(config.host, env.SMTP_HOST);
    assert.equal(config.connectionTimeout, 8_000);
    assert.equal(config.requireTLS, true);
    return { sendMail: async (payload) => { sent = payload; } };
  });
  assert.equal(result, "sent");
  assert.deepEqual(sent, {
    from: env.CONTACT_FROM, to: env.CONTACT_TO, cc: ["copy1@example.test", "copy2@example.test"],
    replyTo: { name: message.name, address: message.email },
    ...renderContactEmail(message),
  });
});

test("renders an escaped HTML email containing the required telephone number", () => {
  const rendered = renderContactEmail({ ...message, name: "<script>unsafe</script>", phone: "+243812345678" }, new Date("2026-01-02T12:00:00Z"));
  assert.match(rendered.html, /&lt;script&gt;unsafe&lt;\/script&gt;/);
  assert.doesNotMatch(rendered.html, /<script>unsafe/);
  assert.match(rendered.html, /\+243812345678/);
  assert.match(rendered.text, /PHONE: \+243812345678/);
});

test("reports a generic failure when the mock mail service rejects", async () => {
  const result = await deliverContactMessage(message, env, () => ({ sendMail: async () => { throw new Error("private provider detail"); } }));
  assert.equal(result, "failed");
});

test("rejects invalid SMTP configuration before making a transport", async () => {
  const result = await deliverContactMessage(message, { ...env, SMTP_PORT: "not-a-port" }, () => { throw new Error("must not create transport"); });
  assert.equal(result, "invalid_config");
  const insecureSubmission = await deliverContactMessage(message, { ...env, SMTP_PORT: "465", SMTP_SECURE: "false" }, () => { throw new Error("must not create transport"); });
  assert.equal(insecureSubmission, "invalid_config");
  const invalidCopyAddress = await deliverContactMessage(message, { ...env, CONTACT_CC: "not-an-email" }, () => { throw new Error("must not create transport"); });
  assert.equal(invalidCopyAddress, "invalid_config");
});
