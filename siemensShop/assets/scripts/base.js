var SIEMENSSHOP = (function () {
  var d = new Date();
  var isMobile = false;
  var isMenuBig = true;
  var products = null;
  var userInfo = null;
  let Config = {
    apiPost: async function (methodName, postData=null) {
      let serverUri = "https://nodejs-express-ecbakas.herokuapp.com";
      let apiResult = await fetch(serverUri + methodName, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        method: "POST",
        redirect: "follow",
        body: JSON.stringify(postData),
      })
        .then(function (response) {
          return response;
        })
        .catch(function (e) {
          console.log("error :", e);
        });
      let result = await apiResult.json();
      let status = apiResult.status;
      return [result, status];
    },
    apiGet: async function (methodName, postData=null) {
      let serverUri = "https://nodejs-express-ecbakas.herokuapp.com";
      let apiResult = await fetch(serverUri + methodName, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        method: "GET",
        redirect: "follow",
      })
        .then(function (response) {
          return response;
        })
        .catch(function (e) {
          console.log("error :", e);
        });
      let result = await apiResult.json();
      let status = apiResult.status;
      return [result, status];
    },
  };
  let Data = {
    login: async function (parameters) {return await SIEMENSSHOP.Config.apiPost("/login", parameters);},
    addUser: async function (parameters) {return await SIEMENSSHOP.Config.apiPost("/users/add", parameters);},
    updateUser: async function (parameters) {return await SIEMENSSHOP.Config.apiPost("/users/update", parameters);},
    users: async function (parameters) {return await SIEMENSSHOP.Config.apiGet("/users", parameters);},
    getProduct: async function (parameters) {return await SIEMENSSHOP.Config.apiGet("/products", parameters);},
    updateProduct: async function (parameters) {return await SIEMENSSHOP.Config.apiPost("/products/update", parameters);},
    deleteProduct: async function (parameters) {return await SIEMENSSHOP.Config.apiPost("/products/delete", parameters);},
    addProduct: async function (parameters) {return await SIEMENSSHOP.Config.apiPost("/products/add", parameters);},


  };
  let View = {
    Dashboard: {
      Charts: {
        productChart: () => {
          Highcharts.chart("container", {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: "pie",
              width:300,
              height:300
            },
            title:"",
            tooltip: {
              pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
            },
            accessibility: {
              point: {
                valueSuffix: "%",
              },
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                  enabled: false,
                },
                showInLegend: false,
              },
            },
            series: [
              {
                name: "Profit",
                colorByPoint: true,
                data: [
                  {
                    name: "May",
                    y: 40.00,
                    sliced: true,
                    selected: true,
                  },
                  {
                    name: "April",
                    y: 30.84,
                  },
                  {
                    name: "March",
                    y: 29.16,
                  },
                ],
              },
            ],
          });
        },
        categoryChart: () => {
          Highcharts.setOptions({   
            colors: ['#C386FF', '#D3A6FF', '#E6CDFF'],
        });
          Highcharts.chart('highcharts_category_container', {

            chart: {
              type: 'solidgauge',
              height: '100%',
            },
            title: "",
          
            tooltip: {
              borderWidth: 0,
              backgroundColor: 'none',
              shadow: false,
              style: {
                fontSize: '16px'
              },
              valueSuffix: '%',
              pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
              positioner: function (labelWidth) {
                return {
                  x: (this.chart.chartWidth - labelWidth) / 2,
                  y: (this.chart.plotHeight / 2) + 15
                };
              }
            },
          
            pane: {
              startAngle: 0,
              endAngle: 360,
              background: [{ // Track for Move
                outerRadius: '112%',
                innerRadius: '88%',
                backgroundColor: Highcharts.color(Highcharts.getOptions().colors[0])
                  .setOpacity(0.3)
                  .get(),
                borderWidth: 0
              }, { // Track for Exercise
                outerRadius: '87%',
                innerRadius: '63%',
                backgroundColor: Highcharts.color(Highcharts.getOptions().colors[1])
                  .setOpacity(0.3)
                  .get(),
                borderWidth: 0
              }, { // Track for Stand
                outerRadius: '62%',
                innerRadius: '38%',
                backgroundColor: Highcharts.color(Highcharts.getOptions().colors[2])
                  .setOpacity(0.3)
                  .get(),
                borderWidth: 0
              }]
            },
          
            yAxis: {
              min: 0,
              max: 100,
              lineWidth: 0,
              tickPositions: []
            },
          
            plotOptions: {
              solidgauge: {
                dataLabels: {
                  enabled: false
                },
                linecap: 'round',
                stickyTracking: false,
                rounded: true
              }
            },
          
            series: [{
              name: 'Clothes',
              data: [{
                color: Highcharts.getOptions().colors[0],
                radius: '112%',
                innerRadius: '88%',
                y: 80
              }]
            }, {
              name: 'Accessory',
              data: [{
                color: Highcharts.getOptions().colors[1],
                radius: '87%',
                innerRadius: '63%',
                y: 65
              }]
            }, {
              name: 'Technological Tools',
              data: [{
                color: Highcharts.getOptions().colors[2],
                radius: '62%',
                innerRadius: '38%',
                y: 50
              }]
            }]
          });
        },
        profitChart: () => {
          Highcharts.chart('highcharts_profit_container', {
            chart: {
              type: 'pie',
              options3d: {
                enabled: true,
                alpha: 45
              }
            },
            plotOptions: {
              pie: {
                innerSize: 100,
                depth: 45
              }
            },
            title:"aaa",
            series: [{
              data: [
                ['Profit', 5],
                ['Loss', 5]
              ]
            }]
          });
        },
      },
      Tables:{

      }
    },
    Product:{
      Tables:{
          productTable(data){
            let tableHead =  `
            <thead>
              <tr>
                  <th>Image</th>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Actions</th>
              </tr>
            </thead>`;
            let tableBody =``;
            $.each(data,(index,item)=>{
                tableBody += `
                  <tr>
                    <td style="width:150px"> <img src="${item.image}" style="width:100%;"> </td>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>${item.price} TL</td>
                    <td>${item.category}</td>
                    <td>${item.brandName}</td>
                    <td>
                      <div class="actionButtons">
                      <button class="btn btn-icon updateProduct" data_prod_id="${item.id}"><i class="bx bx-edit"></i></button>
                      <button class="btn btn-icon deleteProduct" data_prod_id="${item.id}"><i class="bx bx-trash"></i></button>
                      </div>
                    </td>
                </tr>
                `
            });
            $('#example').html(`${tableHead}<tbody>${tableBody}</tbody>`).DataTable();
          }
      },
      Modals:{
        updateProduct(data){
          return `<div class="updateProduct">
        <div class="input_wrapper">
          <label for="update_image">Image Link</label>
          <input type="text" id="product_image" name="image" />
        </div>
        <div class="input_wrapper">
          <label for="product_name">Product Name</label>
          <input type="text" id="product_name" name="product_name" value="${data.name}"/>
        </div>
        <div class="input_wrapper">
          <label for="product_description">Description</label>
          <input type="text" id="product_description" name="product_description" value="${data.description}" />
        </div>
        <div class="input_wrapper">
          <label for="product_price">Product Price</label>
          <input type="text" id="product_price" name="product_price" value="${data.price}"/>
        </div>
        <div class="input_wrapper">
          <label for="product_category">Product Category</label>
          <input type="text" id="product_category" name="product_category" value="${data.category}" />
        </div>
        <div class="input_wrapper">
        <label for="product_brandName">Product Brand</label>
        <input type="text" id="product_brandName" name="product_brandName" />
      </div>
        <div class="update_product_modal_footer">
        <button class="btn btn-text" onclick="$('.ss-Popup').remove()">Close</button>
        <button id="update_product_btn" data_prod_id="${data.id}" class="btn btn-fill">Submit</button>
        </div>
        
      </div>`;
        },
        addProduct(){
          return `<div class="addProduct">
        <div class="input_wrapper">
          <label for="update_image">Image Link</label>
          <input type="text" id="product_image" name="image" />
        </div>
        <div class="input_wrapper">
          <label for="product_name">Product Name</label>
          <input type="text" id="product_name" name="product_name"/>
        </div>
        <div class="input_wrapper">
          <label for="product_description">Description</label>
          <input type="text" id="product_description" name="product_description" />
        </div>
        <div class="input_wrapper">
          <label for="product_price">Product Price</label>
          <input type="text" id="product_price" name="product_price"/>
        </div>
        <div class="input_wrapper">
          <label for="product_category">Product Category</label>
          <input type="text" id="product_category" name="product_category" />
        </div>
        <div class="input_wrapper">
        <label for="product_brandName">Product Brand</label>
        <input type="text" id="product_brandName" name="product_brandName" />
      </div>
        <div class="add_product_modal_footer">
        <button class="btn btn-text" onclick="$('.ss-Popup').remove()">Close</button>
        <button id="add_product_btn" class="btn btn-fill">Submit</button>
        </div>
        
      </div>`;
        },
        deleteProduct(id){
          return `<div class="deleteProduct">
          <p style="max-width:250px">The product will be deleted. You cannot undo this action. Are you sure?</p>
        <div class="update_product_modal_footer">
        <button class="btn btn-text" onclick="$('.ss-Popup').remove()">Close</button>
        <button id="delete_product_btn" data_prod_id="${id}" class="btn btn-fill">Delete</button>
        </div>
        
      </div>`;
        }
      }
    },
    Schedule:{
      updateScheduleView(){
        let scheduled_dates = JSON.parse(localStorage.getItem("scheduled_dates"));
        $(".calendar_list_days > li").removeClass("scheduled low top medium");
          $.each(scheduled_dates, (key,item)=>{
            $(`li > div[data_id=${scheduled_dates[key].id}]`).parent().addClass("scheduled " + item.priority);
          });        
      }
    },

  };
  let Action = {
    User: {
      login: async function (userData) {
        let res = null;
        try {
          Script.ssSkeletonLoader($(document));
          data = await Data.login(userData);
          res = data[0];
          if (data[1] == 200) {
            $(document).find(".ss-skeletonLoader").removeClass("ss-skeletonLoader");
            localStorage.setItem("username",userData.username);
            window.location = "/dashboard.html";
          } else {
            Script.ssPopup("Error", res.message);
            $(document).find(".ss-skeletonLoader").removeClass("ss-skeletonLoader");
          }
        } catch (e) {
          console.log(e, e.message);
        } finally {
          return res;
        }
      },
      addUser: async function (userData) {
        let data = null;
        let result = null;
        try {
          Script.ssSkeletonLoader($(document));
          data = await Data.addUser(userData);
          result = data[0];
          if (data[1] == 200) {
            $(document).find(".ss-skeletonLoader").removeClass("ss-skeletonLoader");
            localStorage.setItem("username",userData.username);
            window.location = "/index.html";
          } else {
            Script.ssPopup("Error", result.message);
            $(document).find(".ss-skeletonLoader").removeClass("ss-skeletonLoader");
          }
        } catch (e) {
          console.log(e, e.message);
        } finally {
          return result;
        }
      },
      getUserDetails: async function () {
        let res = null;
        try {
          data = await Data.users();
          res = data[0];
          if (data[1] == 200) {
            $(document).find(".ss-skeletonLoader").removeClass("ss-skeletonLoader");
            userInfo = res;
          } else {
            Script.ssPopup("Error", res.message);
            $(document).find(".ss-skeletonLoader").removeClass("ss-skeletonLoader");
          }
        } catch (e) {
          console.log(e, e.message);
        } finally {
          return res;
        }
      },
      updateUser: async function (userData) {
        let res = null;
        try {
          Script.ssSkeletonLoader($(document));
          data = await Data.updateUser(userData);
          res = data[0];
          if (data[1] == 200) {
            $(document).find(".ss-skeletonLoader").removeClass("ss-skeletonLoader");
            Script.ssPopup("Success","Update transaction completed succesfully.");
            setTimeout(()=>{
              Script.removessPopup();
              $("#password, #password_confirm").val("");
            },3000)
          } else {
            Script.ssPopup("Error", res.message);
            $(document).find(".ss-skeletonLoader").removeClass("ss-skeletonLoader");
          }
        } catch (e) {
          console.log(e, e.message);
        } finally {
          return res;
        }
      },
  },
    Product:{
      async getProducts(){
        let data = null;
        let result = null;
        let status = null;
        try{
          data = await Data.getProduct();
          result = data[0];
          status = data[1];
          if(status == 200){
            products = result;
            return result;
          }else{
            console.log("200 harici bir status kodu geldi")
            return data;
          }
        }catch(error){
          console.log('Error;',error);
        }
      },
      async addProduct(prodData){
        let data = null;
        let result = null;
        let status = null;
        try{
          data = await Data.addProduct(prodData);
          result = data[0];
          status = data[1];
          if(status == 200){
            Script.removessPopup();
             View.Product.Tables.productTable(await Action.Product.getProducts());
            return result;
          }else{
            console.log("200 harici bir status kodu geldi")
            return data;
          }
        }
        catch(error){
          console.log('Error;',error);
        }

      },
      async updateProduct(prodData){
        let data = null;
        let result = null;
        let status = null;
        try{
          data = await Data.updateProduct(prodData);
          result = data[0];
          status = data[1];
          if(status == 200){
            Script.removessPopup();
             View.Product.Tables.productTable(await Action.Product.getProducts());
            return result;
          }else{
            console.log("200 harici bir status kodu geldi")
            return data;
          }
        }
        catch(error){
          console.log('Error;',error);
        }
      },
      async deleteProduct(prodData){
        let data = null;
        let result = null;
        let status = null;
        try{
          data = await Data.deleteProduct(prodData);
          result = data[0];
          status = data[1];
          if(status == 200){
            Script.removessPopup();
             View.Product.Tables.productTable(await Action.Product.getProducts());
            return result;
          }else{
            console.log("200 harici bir status kodu geldi")
            return data;
          }
        }
        catch(error){
          console.log('Error;',error);
        }
      }
    }
  };
  let Script = {
    ssPopup: function (title, message, buttonState, css) {
      if (buttonState == null) buttonState = true;
      if (css == null) css = "";
      if (buttonState == true) {
        html = '<div class="ss-Popup"><div class="ss-PopupModal" style="' + css + '">\
                        <div class="ss-ModalHeader"><h2>' + title + '</h2></div>\
                            <div class="ss-ModalBody">' + message + '</div>\
                            <div class="ss-ModalFooter"><button id="close" class="btn btn-fill w-100" type="button">Close</button></div>\
                        </div>\
                    </div>';
      } else {
        html = '<div class="ss-Popup"><div class="ss-PopupModal" style="' + css + '">\
                        <div class="ss-ModalHeader"><h2>' + title + '</h2></div>\
                            <div class="ss-ModalBody">' + message + '</div>\
                            <div class="ss-ModalFooter"  style="padding:0;padding-bottom:10px"></div>\
                        </div>\
                    </div>';
      }
      $("body").append(html);
      $(".ss-Popup #close").click(function () {
        $(this).parents(".ss-Popup").remove();
      });
    },
    removessPopup: function () {
      $(".ss-Popup").remove();
    },
    ssToast: async (type = "success", message = "Başarılı", duration = 3000, position = "center-bottom") => {
      let createdAt = Script.Date.getSeconds();

      if (type == "warning") {
        html = `<div class="ss-toast ${type} "><i class="bx bx-error"></i><span>${message}</span></div>`;
        $("#ss-toast-container").prepend(html);
        $("#ss-toast-container").addClass(position);

        setTimeout(() => {
          $("#ss-toast-container")
            .find(".warning:last-child")
            .slideDown("slow", () => {
              $("#ss-toast-container").find(".warning:last-child").remove();
            });
        }, Script.Date.getSeconds() - createdAt + duration);
      }
      if (type == "error") {
        html = `<div class="ss-toast ${type} ${position}"><i class="bx bx-error-circle"></i><span>${message}</span></div>`;
        $("#ss-toast-container").prepend(html);
        $("#ss-toast-container").addClass(position);

        setTimeout(() => {
          $("#ss-toast-container")
            .find(".error:last-child")
            .slideDown("slow", () => {
              $("#ss-toast-container").find(".error:last-child").remove();
            });
        }, Script.Date.getSeconds() - createdAt + duration);
      }
      if (type == "info") {
        html = `<div class="ss-toast ${type} ${position}"><i class="bx bx-info-circle"></i><span>${message}</span></div>`;
        $("#ss-toast-container").prepend(html);
        $("#ss-toast-container").addClass(position);

        setTimeout(() => {
          $("#ss-toast-container")
            .find(".info:last-child")
            .slideDown("slow", () => {
              $("#ss-toast-container").find(".info:last-child").remove();
            });
        }, Script.Date.getSeconds() - createdAt + duration);
      }
      if (type == "success") {
        html = `<div class="ss-toast ${type} ${position}"><i class="bx bx-check-circle"></i><span>${message}</span></div>`;
        $("#ss-toast-container").prepend(html);
        $("#ss-toast-container").addClass(position);

        setTimeout(() => {
          $("#ss-toast-container")
            .find(".success:last-child")
            .slideDown("slow", () => {
              $("#ss-toast-container").find(".success:last-child").remove();
            });
        }, Script.Date.getSeconds() - createdAt + duration);
      }
    },
    ssSkeletonLoader: (element, specific_elements) => {
      element.find("span *").addClass("ss-skeletonLoader");
      element.find("span").addClass("ss-skeletonLoader");
      element.find("input").addClass("ss-skeletonLoader");
      element.find("label").addClass("ss-skeletonLoader");
      element.find("a").addClass("ss-skeletonLoader");
      element.find("button").addClass("ss-skeletonLoader");
      if (specific_elements != null) {
        for (index in specific_elements) specific_elements[index].addClass("ss-skeletonLoader");
      }
    },
    slipFloor: (num) => {
      let f = Math.floor(num);
      if (num - f < 0.5) {
        return f;
      }
      return f + 0.5;
    },
  };
  let init = async function () {
    // device detection
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        navigator.userAgent.substr(0, 4)
      )
    ) {
      isMobile = true;
    }
    await Action.User.getUserDetails();
    if($( window ).width() < 1000)
      $(".wrapper").addClass("min");
    $(window).resize(()=>{
          if($( window ).width() < 1000)
      $(".wrapper").addClass("min");
    })
    $("#reset_password").click(() => {
      Script.ssPopup("Warning", `This feature is not active in the demo.`);
    });
    $("#login").click(() => {
      let loginData = {
        username: $("#username").val(),
        password: $("#password").val(),
      };
      Action.User.login(loginData);
    });
    $("#signup").click(() => {
      let signupData = {
        username: $("#username").val(),
        password: $("#password").val(),
      };
      Action.User.addUser(signupData);
    });
    $("#change_menu_state").click(function () {
      if (isMenuBig) {
        $(".wrapper").addClass("min");
        isMenuBig = !isMenuBig;
      } else {
        $(".wrapper").removeClass("min");
        isMenuBig = !isMenuBig;
      }
    });
    
    
    // let productChartData = await Action.Dashboard.Charts.productChart();
    if(window.location.pathname == '/dashboard.html'){
    //Chartların yüklenmesi
    View.Dashboard.Charts.productChart();
    View.Dashboard.Charts.categoryChart();
    View.Dashboard.Charts.profitChart();

    }
    //Product Tablosu
    if(window.location.pathname == '/products.html'){
      View.Product.Tables.productTable(await Action.Product.getProducts());
      $(document).on('click','.updateProduct',function(){
        let id = $(this).attr('data_prod_id');
        let data = null;
        $.each(products, (index, item)=>{
          if(item.id == id){data = item;}
        });
        console.log("aa")
        Script.ssPopup("Product Update", View.Product.Modals.updateProduct(data),false);
      });
      $(document).on('click','#update_product_btn',async function(){
        let id = $(this).attr("data_prod_id");
        let image = $("#product_image").val();
        let name = $('#product_name').val();
        let description = $('#product_description').val();
        let price = $('#product_price').val();
        let category = $('#product_category').val();
        let brandName = $('#product_brandName').val();
        let updateData = {id:id,image:image,name:name,brandName:brandName, description:description, price:price, category:category}
        
        await Action.Product.updateProduct(updateData);
      });

      $(document).on('click','.deleteProduct',function(){
        let id = $(this).attr('data_prod_id');

        Script.ssPopup("Product Delete", View.Product.Modals.deleteProduct(id),false);
      });
      $(document).on('click','#delete_product_btn',async function(){
        let id = $(this).attr("data_prod_id");
        await Action.Product.deleteProduct({id:id});
      });

      $('.add_product_btn').click( function(){
        Script.ssPopup("Product Update", View.Product.Modals.addProduct(),false);
        
      });

      $(document).on('click', '#add_product_btn', async function(){
        let image = $("#product_image").val();
        let name = $('#product_name').val();
        let description = $('#product_description').val();
        let price = $('#product_price').val();
        let category = $('#product_category').val();
        let brandName = $('#product_brandName').val();

        let addData = {image:image,name:name,brandName:brandName, description:description, price:price, category:category}
        await Action.Product.addProduct(addData);
      });
    }
    // Schedule
    if(window.location.pathname == '/schedule.html'){
      $(document).on("click", "#calendarList li", function(){
        $('.schedule_btn').removeClass("btn-fill-disabled").prop("disabled",false)
        $('.priority_box input[type="radio"]').prop("disabled",false)
        let element = $(this);
        let id = element.attr("id");
        let yearMonth = $("#year_month").text();
        $("#event_date").val(yearMonth+ " " +id);
        $("#calendarList li").removeClass("selected")
        element.addClass("selected")
      });
      $(document).on("click", ".schedule_btn", function(){
        let date = $("#event_date").val();
        let name = $('#event_name').val();
        let description = $('#event_description').val();
        let type = $('#event_type').val();
        let priority = $("input[name='event_priority']:checked").val();

        let id = date.replaceAll(" ","_")
        let addData = {
          id:id,
          name:name,
          date:date,
          description:description,
          type:type,
          priority:priority
        }
        let dizi = [];
        dizi.push(addData);
        if(JSON.parse(localStorage.getItem("scheduled_dates")) != null){
          $.each(JSON.parse(localStorage.getItem("scheduled_dates")),(key,item)=>{
            dizi.push(item);
          })
        }
        localStorage.setItem("scheduled_dates",JSON.stringify(dizi));

        Script.ssPopup("Success","The plan has been added to the calendar.", false);
          setTimeout(()=>{
            Script.removessPopup();
            $("#event_date, #event_name, #event_description,#event_type").val("");
            $('.schedule_btn').addClass("btn-fill-disabled").prop("disabled",true);
            $('.priority_box input[type="radio"]').prop("disabled",true);

          },3000)
        View.Schedule.updateScheduleView();
      });

      $(document).on("click", ".showEvent", function(){
        let data = JSON.parse(localStorage.getItem("scheduled_dates"));
        $.each(data,(key,item)=>{
          if($(this).parent().attr("data_id") == item.id){
            Script.ssPopup(item.name,item.description+" "+item.priority);
          }
        })
      });
      $(document).on("click", ".deleteEvent", function(){
        let data = JSON.parse(localStorage.getItem("scheduled_dates"));
        let newData = [];
        $.each(data,(key,item)=>{
          if($(this).parent().attr("data_id") != item.id){
            newData.push(item);
          }
        })
        localStorage.setItem("scheduled_dates",JSON.stringify(newData));
        View.Schedule.updateScheduleView();
      });

    

      View.Schedule.updateScheduleView();

    }
    if(window.location.pathname == '/profile.html'){
      $('#username').val(localStorage.getItem("username"))
      $(".password_icon").click(function(){
        if($(this).prev().attr("type") == "password"){
          $(this).prev().attr("type","text");
        }
        else{
          $(this).prev().attr("type","password");
        }
      });
      $("#save_user_details").click(async ()=>{
       let username = $("#username").val();
       let password = $("#password").val();
       let password_confirm = $("#password_confirm").val();
       let id = null;
       if(password != password_confirm)
        Script.ssPopup("Warning", "Passwords did not match");
      else{
        $.each(userInfo,(key,item)=>{
          console.log(username,item.username)
          if(item.username === username) id = item._id;
        })
        let userData = {id:id,password:password};
        await Action.User.updateUser(userData);
      }
      });
    }

  };
  return {
    init: function () {
      init();
    },
    Config: Config,
    Data: Data,
    View: View,
    Action: Action,
    Script: Script,
  };
})();
