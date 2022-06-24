jQuery(document).ready(function ($) {
    const albumListTable = $('#album-list-table');
    if (albumListTable && $('div').initDataTable) {
        $('div').initDataTable?.(albumListTable);
    }
});

const albumFields = {
    name: {
      parent: '',
      text: 'Tên album',
    },
    thumbnail: {
        parent: '',
        text: 'Thumbnail',
    },
    artists_name: {
        parent: '',
        text: 'Tên nghệ sĩ',
    }
};

const submitAlbum = (event) => {
    event.preventDefault();
    const errors = Object.keys(albumFields).reduce((r, key) => {
        const { parent, text} = albumFields[key];
        let hasError = false;
        if (!event.target[key]?.value?.trim()) {
            hasError = true;
        }
        if (hasError) {
          if (!r[parent]) r[parent] = [];
          r[parent].push(text);
        }
        return r;
    }, {});
    if (Object.keys(errors).length) {
        displayUiError(errors);
    } else {
        event.target.submit();
    }
};