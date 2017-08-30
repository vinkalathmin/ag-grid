<?php
include 'example-runner.php';

function path_combine(...$parts) {
    return join(DIRECTORY_SEPARATOR, $parts);
}

$exampleDir = basename($_GET['example']);
$exampleSection = basename($_GET['section']);
$files = getDirContents(path_combine('..', $exampleSection, $exampleDir));
array_shift($files); // drop index.php
$scripts = array();
$styles = array();
$preview = isset($_GET['preview']);

foreach ($files as $file) {
    $path = path_combine('..', $exampleSection, $exampleDir, $file);
    $info = pathinfo($path);
    switch ($info['extension']) {
    case 'js':
        $scripts[] = $preview ? $file : $path;
        break;
    case 'css':
        $styles[] = $preview ? $file : $path;
        break;
    }
}
?>
<html>
<head>
<?php if (!$preview) { ?>
    <style> html, body { margin: 0; padding: 0; } </style>
<?php } ?>
    <!-- you don't need ignore=notused in your code, this is just here to trick the cache -->
<?php
$url = "http" . ($_SERVER['HTTPS'] ? 's' : '') . "://{$_SERVER['HTTP_HOST']}/dist/ag-grid/ag-grid.js?ignore=notused50";
?>
    <script src="<?=$url?>"></script>
<?php
foreach ($styles as $style) {
    echo '    <link rel="stylesheet" href="'.$style.'">' . "\n";
}
?>
</head>
<body>

<?php
include path_combine('..', $exampleSection, $exampleDir, 'index.html');

echo "\n";

foreach ($scripts as $script) {
    echo '<script src="'.$script.'"></script>' . "\n";
}
?>
</body>
</html>
