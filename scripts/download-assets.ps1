$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$products = Get-Content -Raw -LiteralPath (Join-Path $root 'src/data/products.json') | ConvertFrom-Json
foreach ($product in $products) {
  $dir = Join-Path $root ("public/images/products/" + $product.slug)
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  foreach ($image in $product.images) {
    $target = Join-Path $root (("public/" + $image.local.TrimStart('/')) -replace '/', [IO.Path]::DirectorySeparatorChar)
    if (-not (Test-Path -LiteralPath $target)) { Invoke-WebRequest -UseBasicParsing -Uri $image.originalUrl -OutFile $target }
  }
}
New-Item -ItemType Directory -Force -Path (Join-Path $root 'public/images/branding') | Out-Null
$html = Get-Content -Raw -LiteralPath (Join-Path $root 'homepage-reference.html')
$logoMatch = [regex]::Match($html, 'content="(https:[^"]+logo[^"]+)"')
if ($logoMatch.Success) { Invoke-WebRequest -UseBasicParsing -Uri ($logoMatch.Groups[1].Value -replace '&amp;','&') -OutFile (Join-Path $root 'public/images/branding/logo.png') }
