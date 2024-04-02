        import {Component, OnInit, ViewChild} from '@angular/core';
        import {ActivatedRoute, Router} from "@angular/router";
        import {UserService} from "../_services/user.service";
        import {CartService} from "../_services/cart.service";
        import {MatPaginator, PageEvent} from "@angular/material/paginator";
        import {MatList, MatListItem, MatListModule} from "@angular/material/list";
        import {
        MatCell, MatCellDef,
        MatColumnDef, MatHeaderCell, MatHeaderCellDef,
        MatHeaderRow,
        MatHeaderRowDef, MatNoDataRow,
        MatRow,
        MatRowDef,
        MatTable,
        MatTableDataSource
      } from "@angular/material/table";
        import {MatDivider} from "@angular/material/divider";
        import {MatIcon} from "@angular/material/icon";
        import {NgForOf} from "@angular/common";
        import {MatFormField, MatLabel} from "@angular/material/form-field";
        import {MatInput} from "@angular/material/input";
        import {MatSort, MatSortHeader} from "@angular/material/sort";


        @Component({
          selector: 'app-order-details',
          standalone: true,
          imports: [
            MatPaginator,
            MatDivider,
            MatList,
            MatListItem,
            MatIcon,
            MatListModule,
            NgForOf,
            MatFormField,
            MatLabel,
            MatTable,
            MatHeaderRow,
            MatHeaderRowDef,
            MatRow,
            MatRowDef,
            MatColumnDef,
            MatHeaderCell,
            MatHeaderCellDef,
            MatCell,
            MatCellDef,
            MatInput,
            MatSort,
            MatSortHeader,
            MatNoDataRow,
          ],
          templateUrl: './order-details.component.html',
          styleUrl: './order-details.component.css'
        })



        export class OrderDetailsComponent implements OnInit {

          userId: number = 0;

          pageIndex = 0;
          pageSize = 5;
          length = 0;

          cartItems: any = [];
          displayedColumns: string[] = ['cartId', 'productName', 'productCost'];
          dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

          @ViewChild(MatPaginator) paginator!: MatPaginator;
          @ViewChild(MatSort) sort!: MatSort;

          constructor(private router: Router, private userService: UserService, private cartService: CartService, private activatedRoute: ActivatedRoute) {
          }

          ngOnInit() {
            this.cartItems = this.activatedRoute.snapshot.data['cartItems'].cartItems;
            this.userId = this.activatedRoute.snapshot.data['cartItems'].userId;
            this.length = this.cartItems.length;
            // console.log(this.cartItems)
            this.dataSource = new MatTableDataSource(this.cartItems);
            this.dataSource.sort = this.sort;

          }

          pageEvent(event: PageEvent) {
            this.pageIndex = event.pageIndex;
            this.pageSize = event.pageSize;
            this.length = event.length;

            const startIndex = this.pageIndex * this.pageSize;
            const endIndex = startIndex + this.pageSize;

            this.fetchCart(event.pageIndex, event.pageSize)
          }

          fetchCart(pageIndex: number, pageSize: number) {

            this.cartService.getCartItems(this.userId, pageIndex, pageSize).subscribe(
              (response: any) => {
                const startIndex = 0;
                const endIndex = startIndex + pageSize;
                this.cartItems = response.slice(startIndex, endIndex);
                // console.log(this.cartItems)
              },
              (error) => {
                // console.log(error)
              }
            )

          }

          deleteCartItem(cartId: number) {
            this.cartService.deleteFromCart(this.userId, cartId).subscribe(
              (response) => {
                this.fetchCart(this.pageIndex, this.pageSize);
              },
              (error) => {
                // console.log(error)
              }
            )
          }

          applyFilter(event: Event) {
            const filterValue = (event.target as HTMLInputElement).value;
            this.dataSource.filterPredicate = (data, filter) => {
              return data.product.productName.toLowerCase().includes(filter);
            };
            this.dataSource.filter = filterValue.trim().toLowerCase();
          }

        }
