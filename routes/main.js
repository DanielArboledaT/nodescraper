const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const request = require('request-promise');

router.get('/', async (req, res) => {

    const $ = await request({
        uri: 'https://www.iceenterprise.com/careers/jobs-results/?category=All&location=All',
        transform: body => cheerio.load(body)
    });

    let jobs = [];
    let divJob = $('.job-search-result').each((i, el) => {
        let job = {};
        const h3Tag = $(el).find('h3').html();
        job.title = h3Tag;
        const pTag = $(el).find("p").html();
        job.location = pTag;
        const aTag = $(el).find("a").attr('href');
        job.url = `https://www.iceenterprise.com/${aTag}`;
        jobs.push(job);

    });

    res.render('index.html', {
        listJobs: jobs
    });

});

module.exports = router;