import { By, Key, Builder, Browser, until } from "selenium-webdriver";

async function testRun() {

  const driver = await new Builder().forBrowser(Browser.CHROME).build();

  try {

    await driver.manage().window().maximize();
    await driver.get("http://demo.evershop.io/");

    const manCategory = await driver.findElement(By.xpath("//a[@href='/kids']"));
    await manCategory.click();
    await driver.sleep(2000);

    const selectKidsShoe = await driver.findElement(By.xpath("//a[@href='/kids/continental-80-shoes-53']"));
    await selectKidsShoe.click();
    await driver.sleep(2000);

    const selectSize = await driver.findElement(By.xpath("//a[text()='L']"));
    await selectSize.click();
    await driver.sleep(1000);

    const selectColor = await driver.findElement(By.xpath("//a[text()='White']"));
    await selectColor.click();
    await driver.sleep(2000);

    const shoeAddToCart = await driver.findElement(By.className("button primary outline"));
    await shoeAddToCart.click();
    await driver.sleep(5000);

    const searchIcon = await driver.findElement(By.className("search-icon"));
    await searchIcon.click();
    await driver.sleep(2000);

    const searchBar = await driver.findElement(By.xpath("//input[@placeholder='Search']"));
    await searchBar.sendKeys("Tasnima Shoes");
    await searchBar.sendKeys(Key.ENTER)

    console.log("Test Case Passed for Search");

    await driver.sleep(5000);

  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    await driver.quit();
  }
}

testRun();
