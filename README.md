# admin-ui

## Instalasi

Jalankan perintah di bawah di folder aplikasi:

```
mim app install admin-ui
```

## TODO

Beberapa komponen yang mungkin perlu ditambahkan:

1. Location Picker
1. Form Audio
1. Form Video

Bagian yang mungkin perlu ditulis ulang:

1. Datetimepicker ( 103,4 KB )
1. Bootstrap Select ( 105,2 KB )
1. Image Viewer ( 80,5 KB )

## Navbar Menu

Konten di navbar menu diisi oleh custom library. Tambahkan konfigurasi seperti di bawah
pada aplikasi/module untuk mendaftarkan library yang akan dipanggil untuk mendapatkan
konten navbar menu. Library tersebut harus mengimplementasikan interface `AdminUi\Iface\NavbarMenu`.

```php
return [
    'adminUi' => [
        'navbarMenu' => [
            'handlers' => [
                '/name/'    => [
                    'class'     => '/ClassName/',
                    'parent'    => '/parent-key/' // gunakan 'none' jika tanpa parent
                ],
                'auth-user' => [
                    'class'     => 'Admin\\Library\\NavbarUser',
                    'parent'    => 'none'
                ]
            ]
        ]
    ]
];
```

Library tersebut harus memiliki method:

### getNavbarMenu(array $meta): array

Mengambil daftar menu yang akan ditambahkan pada level 1 navbar. Fungsi ini diharapkan mengembalikan
struktur array sebagai berikut:

```php
$result = [
    (object)[
        'label'     => 'Menu Label',
        'icon'      => '<i class="#"></i>', // optional html
        'id'        => 'menu-id',
        'link'      => 'menu-link/#0',
        'priority'  => 0
    ],
    ...
];
```

Nilai `id` akan digunakan untuk mencari children menu.

### getSubNavbarMenu(array $menu, array $meta): array

Dipanggil hanya jika property parent bukan `none`. Nilai ini diharapkan mengembalikan array dengan bentuk:

```php
$result = [
    (object)[
        'label'     => 'Submenu Label',
        'icon'      => '<i class="#"></i>', // optional html
        'id'        => 'menu-id',
        'link'      => 'menu-link/#0',
        'priority'  => 0
    ],
    ...
];
```

## Sidebar Menu

Tambahkan konfigurasi seperti di bawah pada module/aplikasi untuk mendaftarkan menu bagian
sidebar:

```php
return [
    'adminUi' => [
        'sidebarMenu' => [
            'items' => [
                '/menu-id/' => [
                    'label'     => 'Menu Label',
                    'icon'      => 'Menu Icon', // in html
                    'route'     => ['routeName', ['params'], ['query']],
                    'priority'  => 0,
                    'perms'     => 'user-perms',
                    'filterable'=> true,
                    'visible'   => true,
                    'children'  => [
                        'label'     => '...',
                        // ...
                    ]
                ]
            ]
        ]
    ]
];
```

Untuk menambahkan menu item secara dynamic, bisa juga dengan suatu class handler yang sudah
mengimplementasikan interface `AdminUi\Iface\SidebarMenu`, dan mendaftarkan pada konfigurasi
seperti di bawah:

```php
return [
    'adminUi' => [
        'sidebarMenu' => [
            'handlers' => [
                '/parent-id/' => [
                    '/Class/',
                    // ...
                ]
            ]
        ]
    ]
];
```

Library tersebut harus memiliki method:

### getSidebarMenu(array $meta): array

Fungsi ini diharapkan mengembalikan nilai seperti di bawah:

```php
$result = [
    (object)[
        'label'     => 'Menu Label',
        'icon'      => 'Menu Icon', // in html
        'link'      => '#0',
        'id'        => 'menu-id',
        'filterable'=> true,
        'visible'   => true,
        'priority'  => 0
    ],
    // ...
]
```