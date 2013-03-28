var 	spawn = require('child_process').spawn
	, 	fs = require('fs')
	, 	path = require('path')
	,	videoFilePath_Type = ''
	,	videoFilePath	= ''
	,	videoFileName 	= ''
	,	storagePath		= ''
	,	MeetingDate		= ''
	,	FFMPEGPath		= 'C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe';

//Argument Count: 118

var FFMPEG_Args		= [
						'-re' //0
						, '-i'
						, 'C:\\Program Files (x86)\\ffmpeg\\bin\\mux.avs'
						, '-y'
						, '-c:v'
						, 'libx264'
						, '-s'
						, '640x480'
						, '-b:v'
						, '1200k'
						, '-pix_fmt' //10
						, 'yuv420p'
						, '-threads'
						, '0'
						, '-aspect'
						, '4:3'
						, '-preset'
						, 'ultrafast'
						, '-tune'
						, 'zerolatency'
						, '-profile:v' //20
						, 'baseline'
						, '-crf'
						, '25'
						, '-c:a'
						, 'libvo_aacenc'
						, '-b:a'
						, '32k'
						, '-ac'
						, '2'
						, '-f' //30
						, 'flv'
						, 'rtmp://server'
						, '-c:v'
						, 'libx264'
						, '-s'
						, '320x240'
						, '-b:v'
						, '500k'
						, '-pix_fmt'
						, 'yuv420p' //40
 						, '-threads'
						, '0'
						, '-aspect'
						, '4:3'
						, '-preset'
						, 'ultrafast'
						, '-tune'
						, 'zerolatency'
						, '-profile:v'
						, 'baseline' //50
						, '-crf'
						, '25'
						, '-c:a'
						, 'libvo_aacenc'
						, '-b:a'
						, '32k'
						, '-ac'
						, '2'
						, '-f'
						, 'flv' //60
						, 'rtmp://server'
						, '-c:v'
						, 'libx264'
						, '-s'
						, '192x144'
						, '-b:v'
						, '96k'
						, '-pix_fmt'
						, 'yuv420p'
						, '-threads' //70
						, '0'
						, '-aspect'
						, '4:3'
						, '-preset'
						, 'ultrafast'
						, '-tune'
						, 'zerolatency'
						, '-profile:v'
						, 'baseline'
						, '-crf' //80
						, '25'
						, '-c:a'
						, 'libvo_aacenc'
						, '-b:a'
						, '16k'
						, '-ac'
						, '1'
						, '-f'
						, 'flv'
						, 'rtmp://server' //90
						, '-c:v'
						, 'libx264'
						, '-s'
						, '320x240'
						, '-b:v'
						, '500k'
						, '-pix_fmt'
						, 'yuv420p'
						, '-threads'
						, '0' //100
						, '-aspect'
						, '4:3'
						, '-preset'
						, 'ultrafast'
						, '-tune'
						, 'zerolatency'
						, '-profile:v'
						, 'baseline'
						, '-crf'
						, '25' //110
						, '-c:a'
						, 'libvo_aacenc'
						, '-b:a'
						, '32k'
						, '-ac'
						, '2'
						, '-f'
						, 'mp4' //118
					];



process.on('message', function(m) {
	videoFilePath_Type 		= path.normalize('\\\\UNCVolumeName\\path\\to\\video\\' + m['Meeting Type'] + '\\' + m['Meeting ID']);
	videoFilePath 			= path.normalize(videoFilePath_Type + '\\');
	videoFileName 			= m['Meeting Date'] + '_' + m['Meeting ID'] + '.mp4';
	storagePath 			= path.normalize(videoFilePath + videoFileName);
	
	/* BEGIN: File Directory Check and Creation */
	fs.exists(path.dirname(videoFilePath_Type), function(exists) {
		if(exists == false) {
			console.log('Parent directory does not exist. Line: 31');
			//Create the parent file path
			fs.mkdir(path.dirname(videoFilePath_Type), 0777, function(error) {
				console.log('Made parent directory. Line: 34');
				//If the parent directory was successfully created...
				if(error && error.code === 'EEXIST') {
					console.log('Parent directory exists. Make destination directory. Line: 37');
					
					//Create the destination / meeting id directory.
					fs.mkdir(videoFilePath, 0777, function(error) {
						//If there is an error, log it to the console.
						//console.log(error);
						console.log('Destination directory made. Line: 49');
						
						var timeStamp 	= (new Date()).getTime().toString();
						videoFileName 	= timeStamp + '_' + videoFileName;
						storagePath 	= path.normalize(videoFilePath + videoFileName);
						//Call the video / FFMPEG function.
						ffmpeg_var = ffmpeg(FFMPEGPath,
						[	FFMPEG_Args[0], FFMPEG_Args[1], FFMPEG_Args[2], FFMPEG_Args[3], FFMPEG_Args[4],
							FFMPEG_Args[5], FFMPEG_Args[6], FFMPEG_Args[7], FFMPEG_Args[8], FFMPEG_Args[9],
							FFMPEG_Args[10], FFMPEG_Args[11], FFMPEG_Args[12], FFMPEG_Args[13], FFMPEG_Args[14],
							FFMPEG_Args[15], FFMPEG_Args[16], FFMPEG_Args[17], FFMPEG_Args[18], FFMPEG_Args[19],
							FFMPEG_Args[20], FFMPEG_Args[21], FFMPEG_Args[22], FFMPEG_Args[23], FFMPEG_Args[24],
							FFMPEG_Args[25], FFMPEG_Args[26], FFMPEG_Args[27], FFMPEG_Args[28], FFMPEG_Args[29],
							FFMPEG_Args[30], FFMPEG_Args[31], FFMPEG_Args[32], FFMPEG_Args[33], FFMPEG_Args[34],
							FFMPEG_Args[35], FFMPEG_Args[36], FFMPEG_Args[37], FFMPEG_Args[38], FFMPEG_Args[39],
							FFMPEG_Args[40], FFMPEG_Args[41], FFMPEG_Args[42], FFMPEG_Args[43], FFMPEG_Args[44],
							FFMPEG_Args[45], FFMPEG_Args[46], FFMPEG_Args[47], FFMPEG_Args[48], FFMPEG_Args[49],
							FFMPEG_Args[50], FFMPEG_Args[51], FFMPEG_Args[52], FFMPEG_Args[53], FFMPEG_Args[54],
							FFMPEG_Args[55], FFMPEG_Args[56], FFMPEG_Args[57], FFMPEG_Args[58], FFMPEG_Args[59],
							FFMPEG_Args[60], FFMPEG_Args[61], FFMPEG_Args[62], FFMPEG_Args[63], FFMPEG_Args[64],
							FFMPEG_Args[65], FFMPEG_Args[66], FFMPEG_Args[67], FFMPEG_Args[68], FFMPEG_Args[69],
							FFMPEG_Args[70], FFMPEG_Args[71], FFMPEG_Args[72], FFMPEG_Args[73], FFMPEG_Args[74],
							FFMPEG_Args[75], FFMPEG_Args[76], FFMPEG_Args[77], FFMPEG_Args[78], FFMPEG_Args[79],
							FFMPEG_Args[80], FFMPEG_Args[81], FFMPEG_Args[82], FFMPEG_Args[83], FFMPEG_Args[84],
							FFMPEG_Args[85], FFMPEG_Args[86], FFMPEG_Args[87], FFMPEG_Args[88], FFMPEG_Args[89],
							FFMPEG_Args[90], FFMPEG_Args[91], FFMPEG_Args[92], FFMPEG_Args[93], FFMPEG_Args[94],
							FFMPEG_Args[95], FFMPEG_Args[96], FFMPEG_Args[97], FFMPEG_Args[98], FFMPEG_Args[99],
							FFMPEG_Args[100], FFMPEG_Args[101], FFMPEG_Args[102], FFMPEG_Args[103], FFMPEG_Args[104],
							FFMPEG_Args[105], FFMPEG_Args[106], FFMPEG_Args[107], FFMPEG_Args[108], FFMPEG_Args[109],
							FFMPEG_Args[110], FFMPEG_Args[111], FFMPEG_Args[112], FFMPEG_Args[113], FFMPEG_Args[114],
							FFMPEG_Args[115], FFMPEG_Args[116], FFMPEG_Args[117], FFMPEG_Args[118], storagePath ], function() {
	

						});
						
					});
				}
				
			});
		} else {
			//The parent file path exists...
			//Set the videoFilePath value to include the destination / meeting id directory.
			
		
			console.log('Parent directory exists. Line: 143');
			//Check to see if the child exists.
			fs.exists(videoFilePath, function(exists) {
				//If the child does not exist...
				if(exists == false) {
					console.log('Destination directory does not exist. Line: 148');
					fs.mkdir(videoFilePath, 0777, function(error) {
						//If there is an error, log it to the console.
						//console.log(error);
						console.log('Destination directory created. Line: 152');
						var timeStamp	= (new Date()).getTime().toString();
						videoFileName 	= timeStamp + '_' + videoFileName;
						storagePath 	= path.normalize(videoFilePath + videoFileName);
						//Call the video / FFMPEG function.
						ffmpeg_var = ffmpeg(FFMPEGPath,
						[	FFMPEG_Args[0], FFMPEG_Args[1], FFMPEG_Args[2], FFMPEG_Args[3], FFMPEG_Args[4],
							FFMPEG_Args[5], FFMPEG_Args[6], FFMPEG_Args[7], FFMPEG_Args[8], FFMPEG_Args[9],
							FFMPEG_Args[10], FFMPEG_Args[11], FFMPEG_Args[12], FFMPEG_Args[13], FFMPEG_Args[14],
							FFMPEG_Args[15], FFMPEG_Args[16], FFMPEG_Args[17], FFMPEG_Args[18], FFMPEG_Args[19],
							FFMPEG_Args[20], FFMPEG_Args[21], FFMPEG_Args[22], FFMPEG_Args[23], FFMPEG_Args[24],
							FFMPEG_Args[25], FFMPEG_Args[26], FFMPEG_Args[27], FFMPEG_Args[28], FFMPEG_Args[29],
							FFMPEG_Args[30], FFMPEG_Args[31], FFMPEG_Args[32], FFMPEG_Args[33], FFMPEG_Args[34],
							FFMPEG_Args[35], FFMPEG_Args[36], FFMPEG_Args[37], FFMPEG_Args[38], FFMPEG_Args[39],
							FFMPEG_Args[40], FFMPEG_Args[41], FFMPEG_Args[42], FFMPEG_Args[43], FFMPEG_Args[44],
							FFMPEG_Args[45], FFMPEG_Args[46], FFMPEG_Args[47], FFMPEG_Args[48], FFMPEG_Args[49],
							FFMPEG_Args[50], FFMPEG_Args[51], FFMPEG_Args[52], FFMPEG_Args[53], FFMPEG_Args[54],
							FFMPEG_Args[55], FFMPEG_Args[56], FFMPEG_Args[57], FFMPEG_Args[58], FFMPEG_Args[59],
							FFMPEG_Args[60], FFMPEG_Args[61], FFMPEG_Args[62], FFMPEG_Args[63], FFMPEG_Args[64],
							FFMPEG_Args[65], FFMPEG_Args[66], FFMPEG_Args[67], FFMPEG_Args[68], FFMPEG_Args[69],
							FFMPEG_Args[70], FFMPEG_Args[71], FFMPEG_Args[72], FFMPEG_Args[73], FFMPEG_Args[74],
							FFMPEG_Args[75], FFMPEG_Args[76], FFMPEG_Args[77], FFMPEG_Args[78], FFMPEG_Args[79],
							FFMPEG_Args[80], FFMPEG_Args[81], FFMPEG_Args[82], FFMPEG_Args[83], FFMPEG_Args[84],
							FFMPEG_Args[85], FFMPEG_Args[86], FFMPEG_Args[87], FFMPEG_Args[88], FFMPEG_Args[89],
							FFMPEG_Args[90], FFMPEG_Args[91], FFMPEG_Args[92], FFMPEG_Args[93], FFMPEG_Args[94],
							FFMPEG_Args[95], FFMPEG_Args[96], FFMPEG_Args[97], FFMPEG_Args[98], FFMPEG_Args[99],
							FFMPEG_Args[100], FFMPEG_Args[101], FFMPEG_Args[102], FFMPEG_Args[103], FFMPEG_Args[104],
							FFMPEG_Args[105], FFMPEG_Args[106], FFMPEG_Args[107], FFMPEG_Args[108], FFMPEG_Args[109],
							FFMPEG_Args[110], FFMPEG_Args[111], FFMPEG_Args[112], FFMPEG_Args[113], FFMPEG_Args[114],
							FFMPEG_Args[115], FFMPEG_Args[116], FFMPEG_Args[117], FFMPEG_Args[118], storagePath ], function() {
	

						});
					});
				} else { 
					console.log('Destination directory already exists. Line: 238');
					//Destination / meeting id directory exists, do nothing.
					var timeStamp = (new Date()).getTime().toString();
					videoFileName = timeStamp + '_' + videoFileName;
					storagePath 	= path.normalize(videoFilePath + videoFileName);
					
					ffmpeg_var = ffmpeg(FFMPEGPath,
						[	FFMPEG_Args[0], FFMPEG_Args[1], FFMPEG_Args[2], FFMPEG_Args[3], FFMPEG_Args[4],
							FFMPEG_Args[5], FFMPEG_Args[6], FFMPEG_Args[7], FFMPEG_Args[8], FFMPEG_Args[9],
							FFMPEG_Args[10], FFMPEG_Args[11], FFMPEG_Args[12], FFMPEG_Args[13], FFMPEG_Args[14],
							FFMPEG_Args[15], FFMPEG_Args[16], FFMPEG_Args[17], FFMPEG_Args[18], FFMPEG_Args[19],
							FFMPEG_Args[20], FFMPEG_Args[21], FFMPEG_Args[22], FFMPEG_Args[23], FFMPEG_Args[24],
							FFMPEG_Args[25], FFMPEG_Args[26], FFMPEG_Args[27], FFMPEG_Args[28], FFMPEG_Args[29],
							FFMPEG_Args[30], FFMPEG_Args[31], FFMPEG_Args[32], FFMPEG_Args[33], FFMPEG_Args[34],
							FFMPEG_Args[35], FFMPEG_Args[36], FFMPEG_Args[37], FFMPEG_Args[38], FFMPEG_Args[39],
							FFMPEG_Args[40], FFMPEG_Args[41], FFMPEG_Args[42], FFMPEG_Args[43], FFMPEG_Args[44],
							FFMPEG_Args[45], FFMPEG_Args[46], FFMPEG_Args[47], FFMPEG_Args[48], FFMPEG_Args[49],
							FFMPEG_Args[50], FFMPEG_Args[51], FFMPEG_Args[52], FFMPEG_Args[53], FFMPEG_Args[54],
							FFMPEG_Args[55], FFMPEG_Args[56], FFMPEG_Args[57], FFMPEG_Args[58], FFMPEG_Args[59],
							FFMPEG_Args[60], FFMPEG_Args[61], FFMPEG_Args[62], FFMPEG_Args[63], FFMPEG_Args[64],
							FFMPEG_Args[65], FFMPEG_Args[66], FFMPEG_Args[67], FFMPEG_Args[68], FFMPEG_Args[69],
							FFMPEG_Args[70], FFMPEG_Args[71], FFMPEG_Args[72], FFMPEG_Args[73], FFMPEG_Args[74],
							FFMPEG_Args[75], FFMPEG_Args[76], FFMPEG_Args[77], FFMPEG_Args[78], FFMPEG_Args[79],
							FFMPEG_Args[80], FFMPEG_Args[81], FFMPEG_Args[82], FFMPEG_Args[83], FFMPEG_Args[84],
							FFMPEG_Args[85], FFMPEG_Args[86], FFMPEG_Args[87], FFMPEG_Args[88], FFMPEG_Args[89],
							FFMPEG_Args[90], FFMPEG_Args[91], FFMPEG_Args[92], FFMPEG_Args[93], FFMPEG_Args[94],
							FFMPEG_Args[95], FFMPEG_Args[96], FFMPEG_Args[97], FFMPEG_Args[98], FFMPEG_Args[99],
							FFMPEG_Args[100], FFMPEG_Args[101], FFMPEG_Args[102], FFMPEG_Args[103], FFMPEG_Args[104],
							FFMPEG_Args[105], FFMPEG_Args[106], FFMPEG_Args[107], FFMPEG_Args[108], FFMPEG_Args[109],
							FFMPEG_Args[110], FFMPEG_Args[111], FFMPEG_Args[112], FFMPEG_Args[113], FFMPEG_Args[114],
							FFMPEG_Args[115], FFMPEG_Args[116], FFMPEG_Args[117], FFMPEG_Args[118], storagePath ], function() {
	

						});
				}
					
			});
		}
	});
	/* END: File Directory Check and Creation */
	
	function ffmpeg(cmd, opts, callback) {
		var p;
		
		if(p == undefined) {
			var p = spawn(cmd, opts);
			
			p.stderr.on('data', function(data) {
				
				fs.readFile(__dirname + '/server-state.json', function(error, data) {
					if(error) {
							console.log(error);	
						} else {
							content = JSON.parse(data);
							console.log(content['State']);
							
							if(content['State'] == 'false') {
								p.stdin.setEncoding('utf8');
								p.stdin.write('q');
								process.exit();
							}
						}
				});
				
			});
			
			return p;
		}
		
	}
});