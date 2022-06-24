jQuery(document).ready(function ($) {
    const songListTable = $('#song-list-table');
    if (songListTable && $('div').initDataTable) {
        $('div').initDataTable?.(songListTable);
    }
});

const songFields = {
    title: {
      parent: '',
      text: 'Tên bài hát',
    },
    artists: {
        parent: '',
        text: 'Nghệ sĩ',
    },
    thumbnail: {
        parent: '',
        text: 'Thumbnail',
    },
    link: {
        parent: '',
        text: 'Link',
    },
    album_id: {
        parent: '',
        text: 'Album',
    },
    category_id: {
        parent: '',
        text: 'Category',
    },
    playlist_id: {
        parent: '',
        text: 'Playlist',
    },
};

const handleDelete = () => {
    const confirmDelete = confirm('Bạn có chắc muốn xóa bài hát này?');
    if (confirmDelete) {
      const form = document.querySelector('#deleteForm');
      form.submit();
    }
};

const submitSong = (event) => {
    event.preventDefault();
    const errors = Object.keys(songFields).reduce((r, key) => {
        const { parent, text} = songFields[key];
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