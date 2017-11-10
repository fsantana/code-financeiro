<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="{{asset('css/admin.css')}}" rel="stylesheet">

    <!-- Scripts -->
    <script>
        window.Laravel = <?php echo json_encode([
            'csrfToken' => csrf_token(),
        ]); ?>
    </script>
</head>
<body>
<div id="app">
    <header>
        @if (Auth::check())
            <?php
            $menuConfig =
                [
                    'name' => Auth::user()->name,
                    'menus' => [
                        ['name' => "Dashboard", 'url' => '/admin/dashboard'],
                        ['name' => 'Contas a pagar', 'url' => '', 'dropdownId' => 'apagar'],
                        ['name' => 'Contas a receber', 'url' => '', 'dropdownId' => 'areceber']
                    ],
                    'menusDropdown' => [
                        [
                            'id' => 'apagar',
                            'items' => [
                                ['name' => 'Listar', 'url' => '/apagar/listar'],
                                ['name' => 'Criar', 'url' => '/apagar/criar']
                            ]
                        ],
                        [
                            'id' => 'areceber',
                            'items' => [
                                ['name' => 'Listar', 'url' => '/areceber/listar'],
                                ['name' => 'Criar', 'url' => '/areceber/criar']
                            ]
                        ],
                    ],
                    'urlLogout' => env('URL_ADMIN_LOGOUT'),
                    'csrfToken' => csrf_token()
                ]

            ?>
            <admin-menu :config="{{ json_encode($menuConfig) }}"></admin-menu>
        @endif
    </header>
    <main>
    @yield('content')
    </main>
    <footer class="page-footer">
        <div class="footer-copyright">
            <div class="container">
                © {{ date('Y') }} <a class="grey-text text-lighten 4" href="//code.education">Code Education</a>
            </div>
        </div>
    </footer>
</div>

<!-- Scripts -->
<script src="{{ asset('build/admin.bundle.js') }}"></script>
</body>
</html>
