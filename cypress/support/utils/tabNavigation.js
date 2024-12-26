const puppeteer = require('puppeteer')

async function wait (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    debuggingPort: 0,
    setDebuggingPort(port) {
        [, this.debuggingPort] = port;
        return null;
    },
    async tabNavigation({ user, pass }) {
        console.log(this.debuggingPort)
        return await puppeteer
            .connect({
                browserURL: "http://localhost:" + this.debuggingPort,
            })
            .then(async browser => {
                try {
                    let page = await browser.newPage()
                    await page.setCookie(
                        { name: 'ebacStoreVersion', value: 'v2', domain: 'lojaebac.ebaconline.art.br' }
                    )

                    await page.goto('http://lojaebac.ebaconline.art.br')
                    await page.waitForSelector('[href="/Tab/Account"]')
                    await page.click('[href="/Tab/Account"]')

                    await page.setRequestInterception(true);
                    page.on('request', (request) => {
                        const headers = request.headers();
                        headers['Content-Type'] = 'application/json';

                        request.continue({
                            headers
                        });
                    });

                    await page.type('[data-testid="email"]', user, { delay: 50 })
                    await page.type('[data-testid="password"]', pass, { delay: 50 })
                    await page.click('[data-testid="btnLogin"]')

                    await wait(2000)

                    await page.waitForSelector('[href="/Tab/Account"]')
                    await page.click('[href="/Tab/Account"]')

                    await wait(2000)

                    await page.close()
                    await browser.disconnect()
                    return true

                } catch (error) {
                    console.log(error)
                    page.close()
                    browser.disconnect()
                    throw (`Erro ao acessar usuario: ${error}`)
                }
            }, err => {
                console.log(err)
            })
    }
}