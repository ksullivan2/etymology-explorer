var cheerio = require('cheerio');
var axios = require('axios');
const fs = require('fs');


const ROOT_URL  = 'https://www.learnthat.org/',
OUTPUT_FILE = 'data/en_roots.txt',
NUM_RETRIES_FETCH = 1;


function main() {
	axios.get(ROOT_URL + '/pages/view/roots.html').then((response) => {
		let writeStream = fs.createWriteStream('data/en_roots.txt');
		let failStream = fs.createWriteStream('data/fail_roots.txt');
	
		let rootList = getRootList(response.data)
		for (var i = 0; i < rootList.length; i++) {
			setTimeout(scrapeIndividualPage.bind(null, rootList[i], writeStream, failStream), 100)
		}
	})
}

function scrapeIndividualPage(rootData, writeStream, failStream, retries = 0) {
	axios.get(ROOT_URL + rootData.link).then((response) => {
		rootData.wordList = getWordList(response.data)
		writeData(rootData, writeStream)
		console.log("success: " + rootData.root)
	}).catch(function(err) {
		if (retries < NUM_RETRIES_FETCH) {
			console.log("retrying:" + rootData.root)
			setTimeout(scrapeIndividualPage.bind(null, rootData, writeStream, failStream, retries + 1), 1000)
		} else {
			writeData(rootData, failStream, true)
			console.log("FAILURE: " + rootData.root,  err)
		}
	})

	
}

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
	return 
}

function writeData(rootData, writeStream, isFailure = false){
	if (!isFailure){delete rootData.link};
	let toWrite = JSON.stringify(rootData) + "\n"

	writeStream.write(toWrite);

	writeStream.on('error', function (err) {
    	console.log('write error', err);
  	});
}

main();

// //for testing
// axios.get('https://www.learnthat.org/word_lists/view/13498').then((response2) => {
// 	 getWordList(response2.data)
// })

// axios.get('https://www.learnthat.org/word_lists/view/12990').then((response2) => {
// 	 console.log('success')
// }).catch(function (err) {
// 	console.log(err)
// })


