const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage();
    var myJSON;
    let result = {};
    let repositoryRes = [];
    await page.goto('https://www.github.com/trending');

    await page.waitForSelector('.Box-row');
    await page.waitForSelector('body > div.logged-out.env-production.page-responsive > div.application-main > main > div.position-relative.container-lg.p-responsive.pt-6 > div > div.Box-header.d-md-flex.flex-items-center.flex-justify-between > nav > a:nth-child(2)');
    repositoryRes = await page.evaluate(() => {
        var repos = document.querySelectorAll('.Box-row');
        let reposDetails = [];
        let repoRes = {};
        repos.forEach((eachRepo) => {
            let eachRepoDetails = {};
            eachRepoDetails.title = (eachRepo.querySelector('h1 > a')) ? eachRepo.querySelector('h1 > a').innerText.trim() : '';
            let url = (eachRepo.querySelector('h1 > a')) ? eachRepo.querySelector('h1 > a').href.trim() : '';
            eachRepoDetails.url = url.replace('https://github.com', '')
            eachRepoDetails.description = (eachRepo.querySelector('p')) ? eachRepo.querySelector('p').innerText.trim() : '';
            eachRepoDetails.language = (eachRepo.querySelector('div.f6.color-fg-muted.mt-2')) ? eachRepo.querySelector('div.f6.color-fg-muted.mt-2').querySelector('span').innerText.trim() : '';
            eachRepoDetails.stars = (eachRepo.querySelector('div.f6.color-fg-muted.mt-2')) ? eachRepo.querySelector('div.f6.color-fg-muted.mt-2').querySelector('a:nth-child(2)').innerText.trim() : '';
            eachRepoDetails.fork = (eachRepo.querySelector('div.f6.color-fg-muted.mt-2')) ? eachRepo.querySelector('div.f6.color-fg-muted.mt-2').querySelector('a:nth-child(3)').innerText.trim() : '';
            reposDetails.push(eachRepoDetails);
        })
        repoRes.repository = reposDetails;
        console.log("Repo Result as Object");
        console.log(repoRes)
        let resJson = JSON.stringify(repoRes);
        console.log("Repo Result as JSON");
        console.log(resJson)
        return reposDetails;
    })
    await page.click('body > div.logged-out.env-production.page-responsive > div.application-main > main > div.position-relative.container-lg.p-responsive.pt-6 > div > div.Box-header.d-md-flex.flex-items-center.flex-justify-between > nav > a:nth-child(2)');
    await page.waitForSelector('body > div.logged-out.env-production.page-responsive > div.application-main > main > div.position-relative.container-lg.p-responsive.pt-6 > div > div:nth-child(2) > article')
    await page.waitForSelector('body > div.logged-out.env-production.page-responsive > div.application-main > main > div.position-relative.container-lg.p-responsive.pt-6 > div > div:nth-child(2) > article > div.d-sm-flex.flex-auto > div.col-sm-8.d-md-flex > div:nth-child(1) > h1');

    let developerRes = await page.evaluate(() => {
        let developers = document.querySelectorAll('body > div.logged-out.env-production.page-responsive > div.application-main > main > div.position-relative.container-lg.p-responsive.pt-6 > div > div:nth-child(2) > article');
        let developersDetails = [];
        let devRes = {};
        console.log(developers)
        developers.forEach((eachDeveloper) => {
            let eachDeveloperDetails = {};
            eachDeveloperDetails.name = (eachDeveloper.querySelector('div.d-sm-flex.flex-auto > div.col-sm-8.d-md-flex > div:nth-child(1) > h1'))? eachDeveloper.querySelector('div.d-sm-flex.flex-auto > div.col-sm-8.d-md-flex > div:nth-child(1) > h1').innerText : '';
            eachDeveloperDetails.userName = (eachDeveloper.querySelector('div.d-sm-flex.flex-auto > div.col-sm-8.d-md-flex > div:nth-child(1) > p'))? eachDeveloper.querySelector('div.d-sm-flex.flex-auto > div.col-sm-8.d-md-flex > div:nth-child(1) > p').innerText : '';
            eachDeveloperDetails.repoName = (eachDeveloper.querySelector('div.d-sm-flex.flex-auto > div.col-sm-8.d-md-flex > div:nth-child(2) > div > article > h1'))? eachDeveloper.querySelector('div.d-sm-flex.flex-auto > div.col-sm-8.d-md-flex > div:nth-child(2) > div > article > h1').innerText : '';
            eachDeveloperDetails.repoDescription = (eachDeveloper.querySelector('div.d-sm-flex.flex-auto > div.col-sm-8.d-md-flex > div:nth-child(2) > div > article > div:nth-child(3)'))? eachDeveloper.querySelector('div.d-sm-flex.flex-auto > div.col-sm-8.d-md-flex > div:nth-child(2) > div > article > div:nth-child(3)').innerText : '';
            developersDetails.push(eachDeveloperDetails)
        })
        devRes.developers = developersDetails;
        console.log("Repo Result as Object");
        console.log(devRes)
        let resJson = JSON.stringify(devRes);
        console.log("Repo Result as JSON");
        console.log(resJson)
        return developersDetails
    })

    result.repositorys = repositoryRes;
    result.developers = developerRes
    // await browser.close();
    console.log("Result as Object");
    console.log()
    console.log(result)
    myJSON = JSON.stringify(result)
    console.log()
    console.log("Result as JSON");
    console.log()
    console.log(myJSON)
    await browser.close();
})();