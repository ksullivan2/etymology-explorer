var cheerio = require('cheerio');
var axios = require('axios');
const fs = require('fs');
const readline = require('readline');


const ROOT_URL  = 'https://www.learnthat.org/',
OUTPUT_FILE = 'data/en_roots.txt',
NUM_RETRIES_FETCH = 1;


function main() {
	axios.get(ROOT_URL + '/pages/view/roots.html').then((response) => {
		let writeStream = fs.createWriteStream('data/en_roots.txt');
		let failStream = fs.createWriteStream('data/fail_roots.txt');
	
		let rootList = getRootList(response.data)
		for (var i = 0; i < rootList.length; i++) {
			setTimeout(scrapeIndividualPage.bind(null, rootList[i], writeStream, failStream), 1000)
		}
	})
}

function scrapeIndividualPage(rootData, writeStream, failStream, retries = 0) {
	axios.get(ROOT_URL + rootData.link).then((response) => {
		wordList = getWordList(response.data)
		if (wordList.length < 1) {
			throw error('wordlist not fetched')
		}
		rootData.wordList  = wordList
		writeData(rootData, writeStream)
		console.log("success: " + rootData.root)
	}).catch(function(err) {
		if (retries < NUM_RETRIES_FETCH) {
			console.log("retrying:" + rootData.root)
			setTimeout(scrapeIndividualPage.bind(null, rootData, writeStream, failStream, retries + 1), 1000 * (retries + 2))
		} else {
			console.log("FAILURE: " + rootData.root,  err.message)
			writeData(rootData, failStream, err)
			
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

function writeData(rootData, writeStream, error = null){
	if (!error){
		delete rootData.link
		if (rootData.error) delete rootData.error;
	} else {
		rootData.error = error.message
	};

	let toWrite = JSON.stringify(rootData) + "\n"

	writeStream.write(toWrite);
}

function secondPass() {
	let readInterface = readline.createInterface({
		input: fs.createReadStream('data/fail_roots.txt'),
		console: false
	})

	writeStream= fs.createWriteStream('data/en_roots2.txt');
	failStream = fs.createWriteStream('data/fail_roots2.txt')

	readInterface.on('line', function(line) {
		scrapeIndividualPage(JSON.parse(line), writeStream, failStream)
	})
}

// main();
let writeStream= fs.createWriteStream('data/en_roots2.txt'),
failStream = fs.createWriteStream('data/fail_roots2.txt')
scrapeIndividualPage({"link":"word_lists/view/123094","root":"tact, tang","def":"touch"}, writeStream, failStream)