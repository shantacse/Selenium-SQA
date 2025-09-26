import { By, Key, Builder, Browser, until } from "selenium-webdriver";


async function login(driver, username, password) {
    await driver.sleep(3000);
    await driver.findElement(By.id("user-name")).sendKeys(username);
    await driver.sleep(3000);
    await driver.findElement(By.id("password")).sendKeys(password);
    await driver.sleep(3000);
    await driver.findElement(By.id("login-button")).click();
}

async function resetAppState(driver) {
    await driver.sleep(3000);
    await driver.findElement(By.id("react-burger-menu-btn")).click();
    await driver.sleep(3000);
    await driver.wait(until.elementLocated(By.id("reset_sidebar_link")), 5000);
    await driver.findElement(By.id("reset_sidebar_link")).click();
    await driver.sleep(3000);
    await driver.findElement(By.id("react-burger-cross-btn")).click();
    await driver.sleep(3000);
}

async function logout(driver) {
    await driver.sleep(3000);
    await driver.findElement(By.id("react-burger-menu-btn")).click();
    await driver.sleep(3000);
    await driver.wait(until.elementLocated(By.id("logout_sidebar_link")), 5000);
    await driver.sleep(3000);
    await driver.findElement(By.id("logout_sidebar_link")).click();
    await driver.sleep(3000);
}

async function execute_q1(driver){

    await driver.get("https://www.saucedemo.com/");
    await login(driver, "locked_out_user", "secret_sauce");
    await driver.sleep(3000);
    const error = await driver.findElement(By.css("h3[data-test='error']")).getText();
     if (!error.includes("locked out")) {
      throw new Error("Expected locked out error not shown");
    }
    await driver.sleep(3000);
    console.log("Question 1 test case executed");
}

async function execute_q2(driver) {

    await driver.get("https://www.saucedemo.com/");
    await login(driver, "standard_user", "secret_sauce");
    await resetAppState(driver);

    const product_id = [
      "add-to-cart-sauce-labs-backpack",
      "add-to-cart-sauce-labs-bike-light",
      "add-to-cart-sauce-labs-bolt-t-shirt"
    ];

    for (let id of product_id) {
        await driver.findElement(By.id(id)).click();
    }

    await driver.sleep(3000);
    await driver.findElement(By.className("shopping_cart_link")).click();
    await driver.sleep(3000);
    await driver.findElement(By.id("checkout")).click();
    await driver.sleep(3000);
    await driver.findElement(By.id("first-name")).sendKeys("Tasnima");
    await driver.sleep(3000);
    await driver.findElement(By.id("last-name")).sendKeys("Santa");
    await driver.sleep(3000);
    await driver.findElement(By.id("postal-code")).sendKeys("4700");
    await driver.sleep(3000);
    await driver.findElement(By.id("continue")).click();
    await driver.sleep(3000);

    await driver.findElement(By.id("finish")).click();
    await driver.sleep(3000);

    const success = await driver.findElement(By.className("complete-header")).getText();
    await driver.sleep(3000);

    if (success !== "Thank you for your order!") {
      throw new Error("Order not successful");
    }

    await resetAppState(driver);
    await logout(driver);

    console.log("Question 2 test case executed");
}

async function execute_q3(driver) {

  await driver.get("https://www.saucedemo.com/");

  await login(driver, "performance_glitch_user", "secret_sauce");
  await driver.sleep(3000);

  await resetAppState(driver);
  await driver.sleep(5000);

  await driver.findElement(By.className("product_sort_container")).sendKeys("Name (Z to A)");
  await driver.sleep(5000);

  const firstItem = (await driver.findElements(By.className("inventory_item")))[0];
  const firstName = await firstItem.findElement(By.className("inventory_item_name")).getText();
  console.log("Selected product:", firstName);
  await driver.sleep(3000);

  await firstItem.findElement(By.tagName("button")).click();
  await driver.sleep(5000);
  await driver.findElement(By.className("shopping_cart_link")).click();

  await driver.sleep(5000);
  await driver.findElement(By.id("checkout")).click();
  await driver.sleep(3000);
  await driver.findElement(By.id("first-name")).sendKeys("Tasnima");
  await driver.sleep(3000);
  await driver.findElement(By.id("last-name")).sendKeys("Santa");
  await driver.sleep(3000);
  await driver.findElement(By.id("postal-code")).sendKeys("4700");
  await driver.sleep(3000);
  await driver.findElement(By.id("continue")).click();

  const productElements = await driver.findElements(By.className("inventory_item_name"));
  
  const names = [];
  for (let el of productElements) {
    names.push(await el.getText());
  }
  console.log("Products in checkout:", names);
  await driver.sleep(3000);

  const total = await driver.findElement(By.className("summary_total_label")).getText();
  console.log("Total price:", total);

  await driver.sleep(3000);
  await driver.findElement(By.id("finish")).click();
  await driver.sleep(3000);
  const successStatus = await driver.wait(
    until.elementLocated(By.className("complete-header")),
    5000
  );

  const success = await successStatus.getText();
  await driver.sleep(3000);

  if (success !== "Thank you for your order!") {
    throw new Error("Order not successful. Found: " + success);
  }
  console.log("Order completed successfully!");

  await resetAppState(driver);
  await logout(driver);

  console.log("Question 3 test case executed");
}

(async function runAllTests() {

  const driver = await new Builder().forBrowser(Browser.CHROME).build();
  await driver.manage().window().maximize();

  try {

    await execute_q1(driver);
    await driver.sleep(3000);
    await execute_q2(driver);
    await driver.sleep(3000);
    await execute_q3(driver);

  } catch (err) {
    console.error("Test Failed:", err.message);
  } finally {
    await driver.quit();
  }
})();
