import assert from "node:assert/strict";
import test from "node:test";
import { deliverContactMessage, type ContactMessage } from "../../src/lib/contact-delivery";

const env = {
  SMTP_HOST: "smtp.example.test", SMTP_PORT: "587", SMTP_SECURE: "false",
  SMTP_USER: "test-user", SMTP_PASS: "test-password",
  CONTACT_TO: "portfolio@example.test", CONTACT_FROM: "sender@example.test",
};
const message: ContactMessage = { name: "QA Tester", email: "qa@example.test", subject: "Test request", message: "This message is synthetic and is never sent." };

test("reports transport not configured without creating a transport", async () => {
  const result = await deliverContactMessage(message, {}, () => { throw new Error("must not create transport"); });
  assert.equal(result, "not_configured");
});

test("sends a validated message through an injected mock transport", async () => {
  let sent: unknown;
  const result = await deliverContactMessage(message, env, (config) => {
    assert.equal(config.host, env.SMTP_HOST);
    assert.equal(config.connectionTimeout, 8_000);
    return { sendMail: async (payload) => { sent = payload; } };
  });
  assert.equal(result, "sent");
  assert.deepEqual(sent, {
    from: env.CONTACT_FROM, to: env.CONTACT_TO,
    replyTo: { name: message.name, address: message.email },
    subject: "[Portfolio] Test request",
    text: `Name: ${message.name}\nEmail: ${message.email}\n\n${message.message}`,
  });
});

test("reports a generic failure when the mock mail service rejects", async () => {
  const result = await deliverContactMessage(message, env, () => ({ sendMail: async () => { throw new Error("private provider detail"); } }));
  assert.equal(result, "failed");
});

test("rejects invalid SMTP configuration before making a transport", async () => {
  const result = await deliverContactMessage(message, { ...env, SMTP_PORT: "not-a-port" }, () => { throw new Error("must not create transport"); });
  assert.equal(result, "invalid_config");
});
