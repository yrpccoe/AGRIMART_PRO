package com.agrimart.e2e.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

public class MarketplacePage {
    private final WebDriver driver;

    public MarketplacePage(WebDriver driver) {
        this.driver = driver;
    }

    public void open(String baseUrl) {
        driver.get(baseUrl + "/marketplace");
    }

    public List<WebElement> getProductCards() {
        return driver.findElements(By.cssSelector(".card"));
    }

    public WebElement findProductByName(String name) {
        return driver.findElement(By.xpath("//h3[text()='" + name + "']"));
    }

    public void addProductToCartByName(String name) {
        WebElement productTitle = findProductByName(name);
        WebElement card = productTitle.findElement(By.xpath("ancestor::div[contains(@class,'card')]"));
        WebElement addBtn = card.findElement(By.xpath(".//button[contains(.,'Add to Cart')]|.//button//*[contains(text(),'Add to Cart')]/.."));
        addBtn.click();
    }
}
