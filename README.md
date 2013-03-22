LiveFFMPEG (03/22/2013)
==========

Live streaming application using NodeJS and FFMPEG.

Description:

This is a very simple web application that uses NodeJS and FFMPEG to live stream three flv streams, in varying qualities, to an RTMP server for redistribution. In addition, the fourth output saves a medium quality mp4 file to a location of the user's choice. There is currently no interface to adjust the quality settings of the four encodes. If you desire higher or lower quality streams you will need to edit the FFMPEG_Args variable witin the "module.js" file.

Hardware Requirements:

In my experience, a minimum of an Intel Core i5 processor with at least 4 GB of RAM is required to adequately encode and stream the four simultaneous outputs.

Software Requirements:

- FFMPEG
- NodeJS
- Socket.io (add-on to NodeJS)
- Web Service that provides an id (unique id), type (string name), and date.

Web Service Info:

Our agency uses the SIRE suite of proudcts for document and agenda management. The web service that was developed in-house was geared towards using the meeting information provided by SIRE in order to uniquely identify meetings from one another in our archive.
