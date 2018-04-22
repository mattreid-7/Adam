const { Client, Util } = require('discord.js');
const { TOKEN, PREFIX, GOOGLE_API_KEY } = require('./config');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const client = new Client({ disableEveryone: true });

const youtube = new YouTube(GOOGLE_API_KEY);

const queue = new Map();

client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => {
	console.log('I\'m Online');
	client.user.setStatus("online");
 	client.user.setActivity(`${PREFIX}help`);
});

client.on('disconnect', () => console.log('I just disconnected, attempting to reconnect now.'));

client.on('reconnecting', () => console.log('I am reconnecting now!'));

client.on('message', async msg => {
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(PREFIX)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(PREFIX.length)

	let index = 0;

	var games = [
		"A single player game and just chill",
		"Counter-Strike: Global Offensive",
		"Overwatch",
		"Roblox or Minecraft",
		"PUBG",
		"Siege"
		];

	if (command === 'giverole') {
		var guild = msg.guild;
	 	msg.member.addRole('433963804733341707').then(console.log).catch(console.error);
	} else

	if (command === 'purge') {
    let messagecount = args[1];
    msg.channel.fetchMessages({limit: messagecount}).then(messages => msg.channel.bulkDelete(messages));
	} else

	if (command === 'ping') {
		msg.channel.send(`Pong! \`${Date.now() - msg.createdTimestamp} ms\``);
	} else

	if (command === 'help') {
		if (args[1] === 'help') {
			msg.channel.sendCode('asciidoc', `= Help = \nCreates a list of available commands \n\nusage:: help`);
			return undefined;
		}
		if (args[1] === 'join') {
			msg.channel.sendCode('asciidoc', `= Join = \nAllows the bot to join your current voice channel \n\nusage:: join`);
			return undefined;
		}
		if (args[1] === 'leave') {
			msg.channel.sendCode('asciidoc', `= Leave = \nForces the bot to leave your current voice channel \n\nusage:: leave`);
			return undefined;
		}
		if (args[1] === 'play') {
			msg.channel.sendCode('asciidoc', `= Play = \nThe bot will either search Youtube for key search terms you enter\nand then ask you to choose a song from a list of the top ten results\nto play or play a song or playlist directly from a URL \n\nusage:: play <search terms/URL>`);
			return undefined;
		}
		if (args[1] === 'stop') {
			msg.channel.sendCode('asciidoc', `= Stop = \nForces the bot to stop playing the current song and leave your current voice channel \n\nusage:: stop`);
			return undefined;
		}
		if (args[1] === 'skip') {
			msg.channel.sendCode('asciidoc', `= Skip = \nForces a skip to the next song in the queue \n\nusage:: skip`);
			return undefined;
		}
		if (args[1] === 'volume') {
			msg.channel.sendCode('asciidoc', `= Volume = \nEither declares the current volume or a new volume can be entered\n\nusage:: volume <new volume>`);
			return undefined;
		}
		if (args[1] === 'pause') {
			msg.channel.sendCode('asciidoc', `= Leave = \nPauses the current song playing \n\nusage:: pause`);
			return undefined;
		}
		if (args[1] === 'resume') {
			msg.channel.sendCode('asciidoc', `= Resume = \nResumes the current song that was previously paused \n\nusage:: resume`);
			return undefined;
		}
		if (args[1] === 'now' && args[2] === 'playing') {
			msg.channel.sendCode('asciidoc', `= Now Playing = \nDisplays the current song playing \n\nusage:: np`);
			return undefined;
		}
		if (args[1] === 'queue') {
			msg.channel.sendCode('asciidoc', `= Queue = \nDisplays the full queue and displays the song currently playing \n\nusage:: queue`);
			return undefined;
		}
		if (args[1] === 'set' && args[2] === 'game') {
			msg.channel.sendCode('asciidoc', `= Set Game = \nAllows you to set the game that the bot will display that it's currently playing \n\nusage:: setgame <game>`);
			return undefined;
		}
		if (args[1] === 'set' && args[2] === 'status') {
			msg.channel.sendCode('asciidoc', `= Set Status = \nAllows you to set the bots current status, these include; online, idle, dnd and invisible \n\nusage:: setstatus <status>`);
			return undefined;
		}
		if (args[1] === 'game') {
			msg.channel.sendCode('asciidoc', `= Game Chooserino = \nRandomly chooses a game from a list to play \n\nusage:: game`);
			return undefined;
		}
		if (args[1] === 'list' && args[2] === 'games') {
			msg.channel.sendCode('asciidoc', `= List Games = \nDisplays the current list of games to choose from \n\nusage:: gamelists`);
			return undefined;
		}
		if (args[1] === 'choice' && args[2] === 'maker') {
			msg.channel.sendCode('asciidoc', `= Choice Maker = \nRandomly chooses between 4 user defined objects \n\nusage:: choose <object1> <object2> <object3> <object4>`)
			return undefined;
		}
		msg.channel.sendCode('asciidoc', `Command List: \n\n[Use .help <commandname> for details]\n\n${++index} - Join\n${++index} - Leave\n${++index} - Play\n${++index} - Stop\n${++index} - Skip\n${++index} - Volume\n${++index} - Pause\n${++index} - Resume\n${++index} - Now Playing\n${++index} - Queue\n${++index} - Set Game\n${++index} - Set Status\n${++index} - Game Chooserino\n${++index} - List Games\n${++index} - Choice Maker`);
	} else

	if (command === 'music') {
		if (args[1] === '1') {
			msg.channel.sendCode('asciidoc', `= One = \nURL:: https://www.youtube.com/playlist?list=PLuSmr7cBiaUhEifBE4_apcJE5sw6BjELN`);
			return undefined;
		}
		if (args[1] === '2') {
			msg.channel.sendCode('asciidoc', `= Two = \nURL:: https://www.youtube.com/playlist?list=PLuSmr7cBiaUgEVnrUKkDmiXc1zSynkzCE`);
			return undefined;
		}
		if (args[1] === '3') {
			msg.channel.sendCode('asciidoc', `= Three = \nURL:: https://www.youtube.com/playlist?list=PLuSmr7cBiaUjwMBMCeIcDK6azmtdKWRst`);
			return undefined;
		}
		if (args[1] === '4') {
			msg.channel.sendCode('asciidoc', `= Four = \nURL:: https://www.youtube.com/playlist?list=PLuSmr7cBiaUil9bKaL8idbZkV7NuIeYmp`);
			return undefined;
		}
		if (args[1] === '5') {
			msg.channel.sendCode('asciidoc', `= 80's = \nURL:: https://www.youtube.com/playlist?list=PLuSmr7cBiaUiaVxzLnMJpOn3sdEF8SVDS`);
			return undefined;
		}
		if (args[1] === '6') {
			msg.channel.sendCode('asciidoc', `= Alt-J | An Awesome Wave = \nURL:: https://www.youtube.com/watch?v=vUdcT-if0vo`);
			return undefined;
		}
		if (args[1] === '7') {
			msg.channel.sendCode('asciidoc', `= Alt-J | This Is All Yours = \nURL:: https://www.youtube.com/watch?v=pvXhITGIbeY`);
			return undefined;
		}
		if (args[1] === '8') {
			msg.channel.sendCode('asciidoc', `= Alt-J | Relaxer = \nURL:: https://www.youtube.com/watch?v=lSuRiuBhciw&t=6s`);
			return undefined;
		}
		if (args[1] === '9') {
			msg.channel.sendCode('asciidoc', `= Jeremy Messersmith | Reluctant Graveyard = \nURL:: https://www.youtube.com/playlist?list=PLuSmr7cBiaUjUl5Qz5XuQeFmMy9tZT4IA`);
			return undefined;
		}
		if (args[1] === '10') {
			msg.channel.sendCode('asciidoc', `= Jeremy Messersmith | Heart Murmurs = \nURL:: https://www.youtube.com/playlist?list=PLuSmr7cBiaUgJRTrfBJUPVjQyUDSiDb6S`);
			return undefined;
		}
		if (args[1] === '11') {
			msg.channel.sendCode('asciidoc', `= Jeremy Messersmith | Late Stage Capitalism = \nURL:: https://www.youtube.com/playlist?list=PLuSmr7cBiaUhQ9Kva-vutEyT52EFt4oM4`);
			return undefined;
		}
		if (args[1] === '12') {
			msg.channel.sendCode('asciidoc', `= Alt-J | Breezeblocks = \nURL:: https://www.youtube.com/watch?v=rVeMiVU77wo`);
			return undefined;
		}
		if (args[1] === '13') {
			msg.channel.sendCode('asciidoc', `= Matt Corby | Brother = \nURL:: https://www.youtube.com/watch?v=_W9ewqSjkKk`);
			return undefined;
		}
		if (args[1] === '14') {
			msg.channel.sendCode('asciidoc', `= Alt-J | An Awesome Wave = \nURL:: https://www.youtube.com/watch?v=vUdcT-if0vo`);
			return undefined;
		}
		if (args[1] === '15') {
			msg.channel.sendCode('asciidoc', `= Alt-J | An Awesome Wave = \nURL:: https://www.youtube.com/watch?v=vUdcT-if0vo`);
			return undefined;
		}

		msg.channel.sendCode('asciidoc', `= Music List = \n\n[Use .music <choice> for selection]\n\nPlaylists: \n${++index} - One \n${++index} - Two\n${++index} - Three\n${++index} - Four\n${++index} - 80's \n\nAlbums: \n${++index} - Alt-J | An Awesome Wave \n${++index} - Alt-J | This Is All Yours \n${++index} - Alt-J | Relaxer\n${++index} - Jeremy Messersmith | Reluctant Graveyard\n${++index} - Jeremy Messersmith | Heart Murmurs\n${++index} - Jeremy Messsersmith | Late Stage Capitalism\n\nSongs:\n${++index} - Alt-J | Breezeblocks\n${++index} - Matt Corby | Brother`);

	} else

	if (command === 'night') {
		let  =
		msg.channel.send(`Night, ${msg.author.username}. I'm turning off now.`);
		return undefined;
	} else

	if (command === 'setgame') {
		if (!args[1]) {
			result = null;
		}
		client.user.setActivity(args[1]);
	}	else

	if (command === 'game') {
		let choice = games[Math.floor(Math.random() * games.length)];
		msg.channel.send(`${msg.author.username}, you should play ${choice}`)
	} else

	if (command === 'choose') {
		var games = [
			`${args[1]}`,
			`${args[2]}`,
			`${args[3]}`,
			`${args[4]}`
		]
		msg.channel.send(games[Math.floor(Math.random() * 3 + 1)])
	} else

	if (command === 'listgames') {
		let counter = -1;
		let index = 0;
		msg.channel.sendCode('asciidoc', `= Game List = \n${++index} - ${games[++counter]}\n${++index} - ${games[++counter]}\n${++index} - ${games[++counter]}\n${++index} - ${games[++counter]}\n${++index} - ${games[++counter]}\n${++index} - ${games[++counter]}`);
	} else

	if (command === 'setstatus') {
    if (!args[1]) {
      args[1] = 'online';
    }
    client.user.setStatus(args[1]);
  } else

	if (command === 'send') {
		client.channels.get(`${args[1]}`).send(`${args[2]} ${args[4]} ${args[5]} ${args[6]} ${args[7]} ${args[8]} `);
	} else

	if (command === 'join') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel || voiceChannel.type !== 'voice') {
			msg.channel.send('You have to be in the voice chat to invite me').catch(error => msg.channel.send(error));
		} else if (msg.guild.voiceConnection) {
			msg.channel.send('I\'m already in a voice channel');
		} else {
			msg.channel.send('Joining...').then(() => {
				voiceChannel.join().then(() => {
					msg.channel.send('Joined.').catch(error => msg.channel.send(error));
				}).catch(error => msg.channel.send(error));
			}).catch(error => msg.channel.send(error));
		}
	} else

	if (command === 'play') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('You have to be in the voice chat to invite me');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`Playlist: **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.send(`__**Song selection:**__\n${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}Please provide a value to select one of the search results ranging from 1-10.`);
					// eslint-disable-next-line max-depth
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('No or invalid value entered, cancelling video selection.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send('I could not obtain any search results.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else

	if (command === 'skip') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could skip for you.');
		serverQueue.connection.dispatcher.end('Skip.');
		return undefined;
	} else

	if (command === 'stop') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could stop for you.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop.');
		return undefined;
	} else

	if (command ==='leave') {
		let voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) {
			msg.channel.send('I am not in a voice channel');
		} else {
			msg.channel.send('Leaving...').then(() => {
				voiceChannel.leave();
			}).catch(error => msg.channel.send(error));
		}
	} else

	if (command === 'volume') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel to use that command');
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		if (!args[1]) return msg.channel.send(`Current volume is: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 10);
		return msg.channel.send(`Volume set to: **${args[1]}**`);
	} else

	if (command === 'np') {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		return msg.channel.send(`Now playing: **${serverQueue.songs[0].title}**`);
	} else

	if (command === 'queue') {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		return msg.channel.send(`__**Song queue:**__**Now playing:** ${serverQueue.songs[0].title}
		`);
	} else

	if (command === 'pause') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('Paused.');
		}
		return msg.channel.send('There is nothing playing.');
	} else

	if (command === 'resume') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('Resumed.');
		}
		return msg.channel.send('There is nothing playing.');
	}
	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 10,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`**${song.title}** has been added to the queue!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 10);

	serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}

client.login(TOKEN);
