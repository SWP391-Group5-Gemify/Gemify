import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SellerComponent } from "../../components/dashboards/seller/seller.component";

const routes: Routes = [
  {
    path: "",
    component: SellerComponent,
    children: [
      {
        path: "",
        redirectTo: "products",
        pathMatch: "prefix",
      },
      {
        path: "products",
        loadChildren: () =>
          import("../../routes/managements/products-routing.module").then(
            (m) => m.ProductsRoutingModule
          ),
      },
      {
        path: "orders",
        loadChildren: () =>
          import("../../routes/managements/orders-routing.module").then(
            (m) => m.OrdersRoutingModule
          ),
      },
      {
        path: "baskets",
        loadChildren: () =>
          import("../../routes/managements/basket-routing.module").then(
            (m) => m.BasketRoutingModule
          ),
      },
      {
        path: "exchange",
        loadChildren: () =>
          import("../../routes/managements/exchange-routing.module").then(
            (m) => m.ExchangeRoutingModule
          ),
      },
      {
        path: "buyback",
        loadChildren: () =>
          import("../../routes/managements/buyback-routing.module").then(
            (m) => m.BuybackRoutingModule
          ),
      },
      {
        path: "warranty",
        loadChildren: () =>
          import("../../routes/managements/warranty-routing.module").then(
            (m) => m.WarrantyRoutingModule
          ),
      },
      {
        path: "**",
        redirectTo: "products",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
