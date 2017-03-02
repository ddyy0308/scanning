<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>UploadiFive Test</title>

    <script src="/scan/common/3rd/jquery/jquery-1.11.2.js"></script>
<script src="jquery.uploadify.min.js" type="text/javascript"></script>

<style type="text/css">
body {
	font: 13px Arial, Helvetica, Sans-serif;
}
</style>
</head>

<body>
	<h1>Uploadify Demo</h1>
	<form>
		<div id="queue"></div>
		<input id="file_upload" name="file_upload" type="file">
	</form>

	<script type="text/javascript">
		<?php $timestamp = time();?>
		$(function() {
			$('#file_upload').uploadify({
				'formData'     : {
					'timestamp' : '<?php echo $timestamp;?>',
					'token'     : '<?php echo md5('unique_salt' . $timestamp);?>'
				},
				'swf'      : 'uploadify.swf',
				'uploader' : 'uploadify.php',
                'multi':false,
                'fileTypeDesc':"请选择升级文件",
                'fileTypeExts':'*.rar;*png;*gif',
                'onUploadSuccess':function(event, queueId, fileObj, response, data){
                    alert(response);
                },
                'onUploadError':function(file, errorCode, errorMsg, errorString){
                    alert('the file'+file.name+'not be uploaded:'+errorMsg +errorString);
                }

			});
		});
	</script>
</body>
</html>