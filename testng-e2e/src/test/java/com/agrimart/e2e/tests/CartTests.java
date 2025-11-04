package com.agrimart.e2e.tests;

import com.agrimart.e2e.BaseTest;
import com.agrimart.e2e.pages.CartPage;
import com.agrimart.e2e.pages.MarketplacePage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class CartTests extends BaseTest {

    @Test
    public void testAddAndRemoveItemFromCart() throws InterruptedException {
        String productName = "Premium Wheat Seeds";

        MarketplacePage marketplace = new MarketplacePage(driver);
        CartPage cart = new CartPage(driver);

        // open marketplace and add product
        marketplace.open(baseUrl);
        Thread.sleep(1000);
        marketplace.addProductToCartByName(productName);

        // open cart and assert item present
        cart.open(baseUrl);
        Thread.sleep(500);
        Assert.assertTrue(cart.hasItem(productName), "Product should be present in cart");

        // remove item and assert not present
        cart.removeItem(productName);
        Thread.sleep(500);
        Assert.assertFalse(cart.hasItem(productName), "Product should be removed from cart");
    }
}
