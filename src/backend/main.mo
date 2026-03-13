import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Text "mo:core/Text";

actor {
  public type Category = {
    #mens;
    #womens;
    #cosmetics;
  };

  public type Product = {
    id : Nat;
    name : Text;
    category : Category;
    subcategory : Text;
    imageUrl : Text;
    regularPrice : Nat;
    offerPrice : Nat;
    description : Text;
    inStock : Bool;
  };

  public type Order = {
    id : Nat;
    customerName : Text;
    mobileNumber : Text;
    district : Text;
    thana : Text;
    fullAddress : Text;
    productId : Nat;
    productName : Text;
    quantity : Nat;
    subtotal : Nat;
    deliveryCharge : Nat;
    grandTotal : Nat;
    timestamp : Int;
  };

  public type SupportMessage = {
    name : Text;
    mobile : Text;
    message : Text;
    timestamp : Int;
  };

  let productsMap = Map.empty<Nat, Product>();
  let ordersMap = Map.empty<Nat, Order>();
  let messagesMap = Map.empty<Nat, SupportMessage>();

  var nextProductId = 17;
  var nextOrderId = 1;
  var nextMessageId = 1;

  public shared ({ caller }) func initialize() : async () {
    // Seed sample products
    let sampleProducts : [Product] = [
      // Menswear
      {
        id = 1;
        name = "Punjabi Kot";
        category = #mens;
        subcategory = "Shirts";
        imageUrl = "https://example.com/punjabi.jpg";
        regularPrice = 1800;
        offerPrice = 1400;
        description = "Stylish panjabi suit for men.";
        inStock = true;
      },
      {
        id = 2;
        name = "Formal Cover";
        category = #mens;
        subcategory = "Pants";
        imageUrl = "https://example.com/formal_suit.jpg";
        regularPrice = 3500;
        offerPrice = 3100;
        description = "Classic formal suit set.";
        inStock = true;
      },
      {
        id = 3;
        name = "Casual Dhoti";
        category = #mens;
        subcategory = "Shirts";
        imageUrl = "https://example.com/casual_shirt.jpg";
        regularPrice = 1000;
        offerPrice = 900;
        description = "Check casual shirt for man.";
        inStock = true;
      },
      {
        id = 4;
        name = "Sweater Chotki";
        category = #mens;
        subcategory = "Kurta";
        imageUrl = "https://example.com/kurta.jpg";
        regularPrice = 2200;
        offerPrice = 1700;
        description = "Elegant kurta for parties.";
        inStock = false;
      },
      // Womenswear
      {
        id = 5;
        name = "Jamdan Saree";
        category = #womens;
        subcategory = "Saree";
        imageUrl = "https://example.com/saree.jpg";
        regularPrice = 2800;
        offerPrice = 2100;
        description = "Beautiful saree in Bangladeshi jamdani style.";
        inStock = true;
      },
      {
        id = 6;
        name = "Lehenga Kajol";
        category = #womens;
        subcategory = "Dress";
        imageUrl = "https://example.com/dress.jpg";
        regularPrice = 3800;
        offerPrice = 3200;
        description = "Fancy dress for wedding events.";
        inStock = true;
      },
      {
        id = 7;
        name = "Coat Ladies";
        category = #womens;
        subcategory = "Shalwar Kameez";
        imageUrl = "https://example.com/shalwar.jpg";
        regularPrice = 1800;
        offerPrice = 1500;
        description = "Comfortable shalwar kameez set.";
        inStock = true;
      },
      {
        id = 8;
        name = "Kameez Kotha";
        category = #womens;
        subcategory = "Kurti";
        imageUrl = "https://example.com/kurti.jpg";
        regularPrice = 900;
        offerPrice = 800;
        description = "Trendy kurti for daily wear.";
        inStock = true;
      },
      // Cosmetics
      {
        id = 9;
        name = "Foundation Cream";
        category = #cosmetics;
        subcategory = "Face";
        imageUrl = "https://example.com/foundation.jpg";
        regularPrice = 680;
        offerPrice = 550;
        description = "Liquid foundation for perfect coverage.";
        inStock = true;
      },
      {
        id = 10;
        name = "Setting Cream";
        category = #cosmetics;
        subcategory = "Lipstick";
        imageUrl = "https://example.com/lipstick.jpg";
        regularPrice = 420;
        offerPrice = 350;
        description = "Longestation lipstick in vibrant colors.";
        inStock = true;
      },
      {
        id = 11;
        name = "Cream Kajal";
        category = #cosmetics;
        subcategory = "Watch";
        imageUrl = "https://example.com/eyeliner.jpg";
        regularPrice = 300;
        offerPrice = 220;
        description = "Easy glide eyeliner for bold eyes.";
        inStock = true;
      },
      {
        id = 12;
        name = "Moisturizing Creamot";
        category = #cosmetics;
        subcategory = "Skin Care";
        imageUrl = "https://example.com/moisturizer.jpg";
        regularPrice = 600;
        offerPrice = 500;
        description = "Nourishing moisturizer cream for soft skin.";
        inStock = false;
      },
      // New Menswear
      {
        id = 13;
        name = "Jeans Pant";
        category = #mens;
        subcategory = "Pants";
        imageUrl = "https://example.com/jeans.jpg";
        regularPrice = 1200;
        offerPrice = 950;
        description = "Trendy jeans for casual wear.";
        inStock = true;
      },
      {
        id = 14;
        name = "Sports Clothing";
        category = #mens;
        subcategory = "Sportswear";
        imageUrl = "https://example.com/sportswear.jpg";
        regularPrice = 1600;
        offerPrice = 1400;
        description = "Comfortable sportswear clothes.";
        inStock = true;
      },
      {
        id = 15;
        name = "Suit Pajama";
        category = #mens;
        subcategory = "Pajamas";
        imageUrl = "https://example.com/pajamas.jpg";
        regularPrice = 800;
        offerPrice = 700;
        description = "Cozy pajamas for nightwear.";
        inStock = true;
      },
      {
        id = 16;
        name = "T-Shirt";
        category = #mens;
        subcategory = "T-Shirts";
        imageUrl = "https://example.com/tshirt.jpg";
        regularPrice = 1100;
        offerPrice = 900;
        description = "Trendy t-shirt for boys.";
        inStock = true;
      },
    ];

    for (product in sampleProducts.values()) {
      productsMap.add(product.id, product);
    };
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    productsMap.values().toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : Category) : async [Product] {
    let filtered = productsMap.values().filter(
      func(product) {
        product.category == category;
      }
    );
    filtered.toArray();
  };

  public query ({ caller }) func getProduct(id : Nat) : async Product {
    switch (productsMap.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func searchProducts(searchTerm : Text) : async [Product] {
    let filtered = productsMap.values().filter(
      func(product) {
        product.name == searchTerm;
      }
    );
    filtered.toArray();
  };

  public shared ({ caller }) func placeOrder(
    customerName : Text,
    mobileNumber : Text,
    district : Text,
    thana : Text,
    fullAddress : Text,
    productId : Nat,
    quantity : Nat,
  ) : async Nat {
    if (quantity == 0) { Runtime.trap("Quantity must be at least 1") };

    let product = switch (productsMap.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?p) { p };
    };

    let subtotal = product.offerPrice * quantity;
    let deliveryCharge = if (district == "Dhaka") { 70 } else { 130 };
    let grandTotal = subtotal + deliveryCharge;

    let order : Order = {
      id = nextOrderId;
      customerName;
      mobileNumber;
      district;
      thana;
      fullAddress;
      productId;
      productName = product.name;
      quantity;
      subtotal;
      deliveryCharge;
      grandTotal;
      timestamp = 0;
    };

    ordersMap.add(nextOrderId, order);
    let currentId = nextOrderId;
    nextOrderId += 1;
    currentId;
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    ordersMap.values().toArray();
  };

  public shared ({ caller }) func sendSupportMessage(name : Text, mobile : Text, message : Text) : async () {
    let newMessage : SupportMessage = {
      name;
      mobile;
      message;
      timestamp = 0;
    };
    messagesMap.add(nextMessageId, newMessage);
    nextMessageId += 1;
  };

  public query ({ caller }) func getSupportMessages() : async [SupportMessage] {
    messagesMap.values().toArray();
  };
};
