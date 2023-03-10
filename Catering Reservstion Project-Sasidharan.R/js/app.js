'use strict';

angular.module('confusionApp',[])

    .controller('MenuController', ['$scope', function($scope){
            $scope.tab = 1;
            $scope.filtText = '';

            $scope.showDetails = false;

            $scope.dishes=[{
                    name: 'Pizza',
                    image: 'img/uthapizza.png',
                    category: 'mains' ,
                    label: 'hot',
                    price: '399',
                    description: 'A unique combinantion of indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur Chillies and Buffalo paneer.',
                    comments: ''
                },
                {
                    name: 'Zucchipakoda',
                    image: 'img/zucchipakoda.png',
                    category: 'appetizer',
                    label: '',
                    price: '199',
                    description: 'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
                    comment: ''  
                },
                {
                    name: 'Donut',
                    image: 'img/vadonut.png',
                    category: 'appetizer',
                    label: ' New',
                    price: '100',
                    description: 'A quintessential ConFusion experience, is it a vada or is it a donut?',
                    comment: ''
                },
                {
                    name: 'ElaiCheese Cake',
                    image: 'img/elaicheesecake.png',
                    category: 'dessert',
                    label: '',
                    price: '299',
                    description: 'A delectable, semi-sweet New York style Cheese cake , with  Graham cracker crust and spiced with  Indian Cardamoms',
                    comment:''
                }];

            

            $scope.select = function(setTab){
                $scope.tab = setTab;

                if(setTab===2){
                    $scope.filtText = "appetizer";
                }
                else if(setTab===3){
                    $scope.filtText = "mains";
                }
                else if(setTab === 4){
                    $scope.filtText = "dessert";
                }
                else{
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function(checkTab){
                return($scope.tab === checkTab);
            };

            $scope.toggleDetails = function(){
                $scope.showDetails = !$scope.showDetails;
            }
    }])


    .controller('ContactController',['$scope', function($scope){

        $scope.feedback = {mychannel: "", firstname: "", lastname: "", agree: false, email: ""};

        var channels = [{value:"tel", label:"Tel."},{value:"Email", label:"Email"}];

        $scope.channels = channels;
        $scope.invalidChannelSelection = false;

    }])

    .controller('FeedbackController',['$scope', function($scope){


        $scope.sendFeedback = function(){

///////////////////////////////////////////////////////////////////////////
            function writeUserData($scope) { // Writes to firebase db

                firebase.database().ref().child('reviews/' + $scope.feedback.firstname + $scope.feedback.lastname).set({
                    firstname: $scope.feedback.firstname,
                    lastname: $scope.feedback.lastname,
                    email: $scope.feedback.email,
                    tel: $scope.feedback.tel.areaCode + $scope.feedback.tel.number,
                    agree: $scope.feedback.agree,
                    channel: $scope.feedback.mychannel,
                    comments: "" + $scope.feedback.comments
                });

            }

            document.getElementById("submit").onclick = writeUserData($scope);
////////////////////////////////////////////////////////////////////////////
            if($scope.feedback.agree && 
                ($scope.feedback.mychannel == "")){
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else{
                $scope.invalidChannelSelection = false;
                $scope.feedback = {
                    mychannel:"", firstname:"",
                    lastname:"", agree:false, email:""};
                $scope.feedback.mychannel="";
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };

    }])
;