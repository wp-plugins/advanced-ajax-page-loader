<?php
$uploads = wp_upload_dir();
$GLOBALS['AAPLimages'] = $uploads['basedir'] . '/AAPL';
$GLOBALS['AAPLimagesurl'] = $uploads['baseurl'] . '/AAPL';

if (get_option('AAPL_upload_error')) {
	echo get_option('AAPL_upload_error');
}
?>
<div class="wrap">
	<h2>Advanced Ajax Page Loader</h2>
	
	<div style="border:1px solid #720921;color:#720921; background-color:#f9dbe1 ;padding:5px;margin-top:10px;margin-bottom:20px;">
		<div style="float:right">
			<form action="https://www.paypal.com/cgi-bin/webscr" method="post">
				<input type="hidden" name="cmd" value="_s-xclick">
				<input type="hidden" name="hosted_button_id" value="3P6VT6B5EBVCA">
				<input type="image" src="https://www.paypalobjects.com/en_US/GB/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal — The safer, easier way to pay online.">
				<img alt="" border="0" src="https://www.paypalobjects.com/en_GB/i/scr/pixel.gif" width="1" height="1">
			</form>
		</div>
		I'm working really hard to provide extremely useful functionality for this plugin, over the coming months this plugin will be packed with more and more features to make your life easier!
		<br>
		If your using this on your site and it has saved you time/money and/or just made your site FREAKIN AWESOME, or you are using this plugin in a commercial project, think about the time and
		effort put into this plugin for free so that life is easier for you, <b>consider a donation!</b>
	</div>

	<form method="post" action="options.php" enctype="multipart/form-data">
		<?php wp_nonce_field('update-options'); ?>
		<?php settings_fields('AAPL'); ?>

		<table class="form-table">

			<tr valign="top">
				<th scope="row">Content Element ID:</th>
				<td><input type="text" name="AAPL_content_id" value="<?php echo get_option('AAPL_content_id'); ?>" style="width:200px;" /></td>
			</tr>
			
			<tr valign="top">
				<th scope="row">Loading Image</th>
				<td>
			
					<div style="float:left">
						Uploaded:<br>
						<script type="text/javascript">
							function AAPLchangeimg(that) {
								document.getElementById('currentl').src="<?php echo $GLOBALS['AAPLimagesurl'] . '/loaders/'; ?>" + that.options[that.selectedIndex].value;
								//$('#currentl').attr('src','' + $('#selectl option:selected').val());
							}
						</script>
						<select id="selectl" name="AAPL_loading_img" onchange="AAPLchangeimg(this);" style="width:200px;">
							<?php
							$files = scandir($GLOBALS['AAPLimages'] . '/loaders');
							
							foreach ($files as $file) {
								if ($file != "." && $file != "..") {
									AAPL_rcopy("$src/$file", "$dst/$file");
									?>
									<option value="<?php echo $file; ?>" <?php if (strcmp(get_option('AAPL_loading_img'), $file)==0) { echo ' SELECTED="SELECTED" ';} ?>><?php echo $file; ?></option>
									<?php
								}
							}
							?>
						</select><br><br>
						Upload:<br>
						<input type="file" name="AAPLuploadloader" style="width:200px;">
					</div>
					
					<div style="float:left; border:1px dashed #464646; padding:10px; margin-left:10px;width:170px;height:130px;">
						Selected:<br>
						<div style="width:180px;height:120px;overflow:auto;">
							<img id="currentl" src="<?php echo $GLOBALS['AAPLimagesurl'] . '/loaders/' . get_option('AAPL_loading_img'); ?>" alt="" title="" />
						</div>
					</div>
					
					<div style="clear:both"></div>
				</td>
			</tr>
			
			<tr valign="top">
				<th scope="row">Reload Code</th>
				<td>
					Drop any reload code you need below, if you need any help with this then please refer to the '<a href="http://software.resplace.net/WordPress/AjaxPageLoader.php" target="_blank">useful reload codes</a>', or <a href="http://wordpress.org/extend/plugins/advanced-ajax-page-loader/" target="_blank">ask for help on the WordPress forum</a>.<br>
					<i>Make sure function AAPL_reload_code() { } isnt around the code (if you upgraded from 2.5.0)</i>
					<br><br>
					<textarea name="AAPL_reload_code" style="width:100%;height:250px"><?php echo get_option('AAPL_reload_code'); ?></textarea>
				</td>
			</tr>
			
			<tr valign="top">
				<th scope="row">Plugin Debug</th>
				<td>
					Fiddle with these options if your having problems...<br><br>
					<input id="AAPL_js_debug" type="checkbox" name="AAPL_js_debug" value="true" <?php if (strcmp(get_option('AAPL_js_debug'), "true")==0) { echo ' CHECKED="CHECKED" ';} ?> /><label for="AAPL_js_debug">Enable JavaScript Debug Messages.</label><br>
					<input id="AAPL_jquery_check" type="checkbox" name="AAPL_jquery_check" value="true" <?php if (strcmp(get_option('AAPL_jquery_check'), "true")==0) { echo ' CHECKED="CHECKED" ';} ?> /><label for="AAPL_js_debug">Enable jQuery check.</label>
				</td>
			</tr>
			
			<tr valign="top">
				<th scope="row">Link to us</th>
				<td>
					Show your support for AAPL and link back to us :)<br><br>
					<input id="AAPL_sponsor" type="checkbox" name="AAPL_sponsor" value="true" <?php if (strcmp(get_option('AAPL_sponsor'), "true")==0) { echo ' CHECKED="CHECKED" ';} ?> /><label for="AAPL_js_debug">Enable footer link.</label><br>
					</td>
			</tr>

		</table>

		<input type="hidden" name="action" value="update" />
		<input type="hidden" name="AAPL_version" value="<?php echo get_option('AAPL_version'); ?>" />

		<p class="submit">
			<input type="submit" class="button-primary" value="<?php _e('Save Changes') ?>" />
		</p>

	</form>
</div>
