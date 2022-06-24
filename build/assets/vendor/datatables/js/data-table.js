jQuery(document).ready(function ($) {
    "use strict";
    const defaultDatatableConfig = {
        language: {
            lengthMenu: "Hiển thị _MENU_ kết quả",
            zeroRecords: "Không có dữ liệu",
            info: "Trang _PAGE_ / _PAGES_",
            infoEmpty: "Không có dữ liệu",
            infoFiltered: "(Lọc từ _MAX_ kết quả)",
            search: "Tìm kiếm",
            paginate: {
                first: "Đầu tiên",
                last: "Cuối cùng",
                next: "Tiếp",
                previous: "Trước",
            },
        },
        lengthMenu: ["10", "20"],
    };

    if ($("table#order-list-table").length) {
        $(document).ready(function () {
            $("table#order-list-table").DataTable({
                ...defaultDatatableConfig,
                ordering: false,
            });
        });
    }

    if ($("table#extra-list-table").length) {
        $(document).ready(function () {
            $("table#extra-list-table").DataTable({
                ...defaultDatatableConfig,
                ordering: false,
            });
        });
    }

    if ($("table#post-list-table").length) {
        $(document).ready(function () {
            $("table#post-list-table").DataTable({
                ...defaultDatatableConfig,
                ordering: false,
            });
        });
    }

    // csv-list-table
    if ($("table#csv-list-table").length) {
        $(document).ready(function () {
            $("table#csv-list-table").DataTable({
                ...defaultDatatableConfig,
                ordering: false,
            });
        });
    }

    //import-list-table
    if ($("table#import-list-table").length) {
        $(document).ready(function () {
            $("table#import-list-table").DataTable({
                ...defaultDatatableConfig,
                ordering: false,
            });
        });
    }

    if ($("table.salary-table").length) {
        $(document).ready(function () {
            $("table.salary-table").DataTable({
                ...defaultDatatableConfig,
                ordering: false,
                searching: false,
                paging: false,
            });
        });
    }

    if ($("table#dashboard-list-table-1").length) {
        $(document).ready(function () {
            $("table#dashboard-list-table-1").DataTable({
                ...defaultDatatableConfig,
                ordering: false,
            });
        });
    }

    if ($("table#dashboard-list-table-2").length) {
        $(document).ready(function () {
            const table = $("table#dashboard-list-table-2").DataTable({
                ...defaultDatatableConfig,
                ordering: false,
            });
        });
    }
});
