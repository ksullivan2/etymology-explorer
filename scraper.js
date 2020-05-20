var cheerio = require('cheerio');
var rp = require('request-promise');
var Promise = require('bluebird');
var axios = require('axios');

const ROOT_URL  = 'https://www.learnthat.org/'


axios.get(ROOT_URL + '/pages/view/roots.html').then((response) => {
	scrape(response.data)
})

function scrape(html) {
	let $ = cheerio.load(html);

	let tableRows = $('table.root_meanings > tbody > tr')
	scrapedData = tableRows.map((i, row) => {
		let $row = $(row),
		datum = {
			link: ROOT_URL + $row.find('td:nth-of-type(1) > a').attr('href'),
			root: $row.find('td:nth-of-type(2)').text(),
			def:  $row.find('td:nth-of-type(3)').text()
		}
		if (datum.link) {
			return datum
		}
	})
}



