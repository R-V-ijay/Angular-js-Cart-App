let cartApp = angular.module("cartApp", ["ngRoute"]);

cartApp.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "../../assets/pages/homePage.html",
    })
    .when("/cart", {
      templateUrl: "../../assets/pages/cartPage.html",
    });
});

//?============ Cart Products ==============//

cartApp.service("cartList", function () {
  this.products = [];
});

//============ Home Controller ==============//

cartApp.controller("homeController", [
  "$http",
  "cartList",
  function ($http, cartList) {
    let home = this;

    //?============ Get Json Data ==============//
    $http.get("../../assets/javascript/products.json").then((response) => {
      home.datas = response.data;
    });

    //?============ Add To Cart Function ==============//

    home.addBtn = function ($event) {
      $event.preventDefault();

      home.clickedId = $event.currentTarget.id;
      angular.forEach(home.datas, function (value) {
        if (home.clickedId === value.id) {
          if (cartList.products.indexOf(value) == -1) {
            cartList.products.push(value);
          }
          console.log(cartList.products);
        }
      });
    };
  },
]);

//============ CartPage Controller ==============//

cartApp.controller("cartPage", [
  "$scope",
  "cartList",
  function ($scope, cartList) {
    console.log(cartList.products);
  },
]);
