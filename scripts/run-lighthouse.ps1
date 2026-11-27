$ErrorActionPreference = 'Stop'
$chrome = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
if (-not (Test-Path -LiteralPath $chrome)) { throw "Microsoft Edge not found at $chrome" }
$output = Join-Path (Get-Location) 'docs/evidence/lighthouse'
New-Item -ItemType Directory -Path $output -Force | Out-Null
$routes = @(
  @{ name = 'home'; path = '/' },
  @{ name = 'projects'; path = '/projets' },
  @{ name = 'case-arkena'; path = '/projets/arkena-core' },
  @{ name = 'career'; path = '/parcours' },
  @{ name = 'contact'; path = '/contact' }
)
foreach ($route in $routes) {
  foreach ($device in @('mobile', 'desktop')) {
    $url = "http://127.0.0.1:3101$($route.path)"
    $report = Join-Path $output "$($route.name)-$device.json"
    $args = @('--yes', 'lighthouse', $url, "--chrome-path=$chrome", '--output=json', "--output-path=$report", '--only-categories=performance,accessibility,best-practices,seo', '--throttling-method=simulate', '--quiet', '--chrome-flags=--headless --no-sandbox --disable-gpu --disable-dev-shm-usage')
    if ($device -eq 'desktop') { $args += '--preset=desktop' }
    & npx.cmd @args
    if ($LASTEXITCODE -ne 0) { throw "Lighthouse failed for $($route.name) $device (exit $LASTEXITCODE)" }
  }
}
Write-Output "Lighthouse reports written to $output"
