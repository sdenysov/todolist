var core = (function ($, $Lodash) {

    var $$components = {};
    var $injector = new Injector({
        'jQuery': {useValue: $}
    });
    var $$store = {
        allSelected: false,
        tasks: [],
        selectedTasks: [],
        taskCount: 3
    };

    return {
        component: function (selector, descriptor) {
            $$components[selector] = {
                selector: selector,
                store: descriptor.store || [],
                dependencies: descriptor.dependencies || [],
                templateUrl: descriptor.templateUrl,
                controller: descriptor.controller,
                events: {}
            };
        },
        service: function (serviceName, descriptor) {
            var token = '$' + serviceName;
            $injector.register(token, {
                dependencies: descriptor.dependencies || [],
                constructor: descriptor.constructor
            });
        },
        run: function () {
            var $core = this;
            var $httpService = $injector.get('$httpService');
            Object.keys($$components).forEach(function (selector) {
                var $component = $$components[selector];
                $httpService.get($component.templateUrl, function (template) {
                    var $template = $Lodash.template(template);
                    var $host = $(selector);
                    var $scope = new Scope($core, $component, $host, $template);
                    $component.store.forEach(function (property) {
                        Object.defineProperty($scope, property, {
                            get: function () {
                                return $$store[property];
                            },
                            set: function (value) {
                                if ($$store[property] !== value) {
                                    $$store[property] = value;
                                }
                            }
                        });
                    });
                    var localDeps = {'$scope': $scope};
                    var dependencies = $component.dependencies.map(function (token) {
                        return localDeps[token] || $injector.get(token);
                    });
                    $component.controller.apply(null, dependencies);
                    $scope.$render();
                })
            });
        },
        triggerEvent: function (event, data) {
            Object.keys($$components)
                .map(function (selector) {return $$components[selector]})
                .forEach(function ($component) {
                    var handler = $component.events[event];
                    handler && handler(data);
                });
        }
    };

    function Scope($core, $component, $host, $template) {
        return {
            $notify: function (event, data) {
                var self = this;
                $core.triggerEvent(event, data);
                self.$render();
            },
            $on: function (event, handler) {
                var self = this;
                $component.events[event] = function (data) {
                    handler(data);
                    self.$render();
                };
            },
            $render: function () {
                var self = this;
                $host.html($template(self));
                $host.find('[data-filter]').click(function ($event) {
                    var handlerName = $(this).data('filter');
                    handlerName && self[handlerName].call(self, $event);
                });
                $host.find('[data-change]').change(function ($event) {
                    var handlerName = $(this).data('change');
                    handlerName && self[handlerName].call(self, $event);
                });
                $host.find('[data-checked]').each(function () {
                    var $checkbox = $(this);
                    var checked = $checkbox.data('checked');
                     $checkbox.prop('checked', checked === true);
                });
                $host.find('[data-enterKey]').keypress(function ($event) {
                    if ($event.which === 13) {
                        var handlerName = $(this).data('enterkey');
                        handlerName && self[handlerName].call(self, $event);
                    }
                });
                $host.on('click', function ($event) {
                    var $target = $($event.target);
                    var clickFn = $target.data('click');
                    clickFn && self[clickFn]($event);
                });
            }
        };
    }

    function Injector(providers) {
        var $$dependencies = {};
        var $$providers = providers;
        var $injector = {
            get: function (token) {
                var dependency = $$dependencies[token];
                if (dependency) {
                    return dependency;
                }
                var $provider = $$providers[token];
                if ($provider.useValue) {
                    dependency = $provider.useValue;
                } else if ($provider.constructor) {
                    var resolved = [];
                    if ($provider.dependencies) {
                        resolved = $provider.dependencies.map($$inject);
                    }
                    dependency = $provider.constructor.apply(null, resolved);
                }
                $$dependencies[token] = dependency;
                return dependency;
            },
            register: function (token, provider) {
                $$providers[token] = provider;
            }
        };
        var $$inject = $injector.get.bind($injector);
        Object.keys($$providers).forEach($$inject);
        $$dependencies['$injector'] = $injector;
        return $injector;
    }
})(jQuery, _);