package com.agrimart.e2e.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class CartPage {
    private final WebDriver driver;

    public CartPage(WebDriver driver) {
        this.driver = driver;
    }

    public void open(String baseUrl) {
        driver.get(baseUrl + "/cart");
    }

    public boolean hasItem(String name) {
        try {
            driver.findElement(By.xpath("//h3[text()='" + name + "']"));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public void removeItem(String name) {
        WebElement title = driver.findElement(By.xpath("//h3[text()='" + name + "']"));
        WebElement card = title.findElement(By.xpath("ancestor::div[contains(@class,'card')]"));
        WebElement removeBtn = card.findElement(By.xpath(".//button[.//svg or contains(., 'Remove') or contains(., 'Remove') or contains(., 'Trash') or contains(., 'Remove')]"));
        removeBtn.click();
    }

    public int getTotal() {
        String totalText = driver.findElement(By.xpath("//div[contains(text(),'Total')]/following-sibling::* | //div[contains(@class,'Order Summary')]/descendant::*[contains(text(),'Total')]")).getText();
        totalText = totalText.replaceAll("[^0-9]", "");
        return totalText.isEmpty() ? 0 : Integer.parseInt(totalText);
    }
}
