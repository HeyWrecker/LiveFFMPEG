V=DirectShowSource("am_video.GRF", audio=false, video=true, fps=30, framecount=1000000)
A=DirectShowSource("am_audio.GRF", video=false, audio=true, fps=30, framecount=1000000)
AudioDub(V, A)