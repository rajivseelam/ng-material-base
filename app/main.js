;

window.ng = window.angular;

var app = ng.module('app', ['ngMaterial', 'ngAnimate']);

app.controller('master', [
    '$scope',
    function ($scope) {
        $scope.menu = {
            sections: [
                {
                    name: 'Teams',
                    href: '#teams',
                    items: [
                        {name: 'Droid', href: '#teams/droid'},
                        {name: 'Api', href: '#teams/api'},
                        {name: 'Design', href: '#teams/design'},
                        {name: 'iOS', href: '#teams/ios'},
                        {name: 'Socket', href: '#teams/socket'},
                        {name: 'Marketing', href: '#teams/marketing'}
                    ]
                }
            ],

            active: {
                section: null,
                item: null,
            },

            activateSection: function (section) {
                this.active.section = section;
            },

            activateSectionItem: function (section, item) {
                this.active.item = item;
            }
        };

        $scope.menu.activateSection($scope.menu.sections[0]);
    }
]);