var cheerio = require('cheerio');
var axios = require('axios');
const fs = require('fs');

const ROOT_URL  = 'https://www.learnthat.org/',
OUTPUT_FILE = 'data/en_roots.txt';

// //for testing
// axios.get('https://www.learnthat.org/word_lists/view/13498').then((response2) => {
// 	 getWordList(response2.data)
// })

// axios.get('https://www.learnthat.org/word_lists/view/12902').then((response2) => {
// 	 getWordList(response2.data)
// })


axios.get(ROOT_URL + '/pages/view/roots.html').then((response) => {
	let rootList = getRootList(response.data)
	for (var i = 0; i < rootList.length; i++) {
		let rootData = rootList[i]
		axios.get(ROOT_URL + rootData.link).then((response2) => {
			rootData.wordList = getWordList(response2.data)
			delete rootData.link;
			fs.appendFile(OUTPUT_FILE, formatForOutput(rootData), function (err) {
			    if (err) {
			    	console.log("Failed: " + rootData.root)
			    } else {
			    	console.log('Saved: ' + rootData.root);	
			    }
			});
		})
	}
})

function getRootList(html) {
	let $ = cheerio.load(html);

	let tableRows = $('table.root_meanings > tbody > tr')
	return scrapedData = tableRows.map((i, row) => {
		let $row = $(row),
		datum = {
			link: $row.find('td:nth-of-type(1) > a').attr('href'),
			root: $row.find('td:nth-of-type(2)').text(),
			def:  $row.find('td:nth-of-type(3)').text()
		}
		if (datum.link != undefined) {
			return datum
		}
	})

}

function getWordList(html) {
	let $ = cheerio.load(html)

	let wordEL = $('small.chapter_words'),
		words = [];

	for (var i = 0; i < wordEL.length; i++) {
		words = words.concat($(wordEL[i]).text().split(","))
	}
	
	return words
}

function formatForOutput(object) {
	return JSON.stringify(object) + "\n"
}


