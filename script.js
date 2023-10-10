$(document).ready(function() {
  function jobFilter() {
    var searchTerm = $('#searchInput').val().toLowerCase();
    var activeFilters = {
      role: [],
      level: [],
      languages: [],
      tools: []
    };

    $('.job').each(function() {
      var job = $(this);
      var jobTitle = job.find('h2').text().toLowerCase();
      var showJob = true;

      if (searchTerm && !jobTitle.includes(searchTerm)) {
        showJob = false;
      }

      $.each(activeFilters, function(filter, values) {
        if (values.length > 0 && values.indexOf(job.data(filter)) === -1) {
          showJob = false;
        }
      });

      if (showJob) {
        job.show();
      } else {
        job.hide();
      }
    });
  }

  jobFilter();

  $('#searchInput').on('input', jobFilter);

  $('.job').click(function() {
    var job = $(this);
    var jobDetails = job.clone();
    jobDetails.find('.delete-button').remove();
    jobDetails.addClass('job-details-popup');
    jobDetails.appendTo('body');
    $('.job-details-popup').fadeIn();

    $(document).mouseup(function(e) {
      if (!jobDetails.is(e.target) && jobDetails.has(e.target).length === 0) {
        jobDetails.remove();
      }
    });
  });

  $('#addJobButton').click(function() {
    $('#addJobModal').fadeIn();
  });

  $('#addJobForm').submit(function(e) {
    e.preventDefault();

    var jobTitle = $('#jobTitleInput').val();
    var jobLevel = $('#jobLevelInput').val();
    var jobLanguages = $('#jobLanguagesInput').val();
    var jobTools = $('#jobToolsInput').val();
    var jobImage = $('#jobImageInput').val();

    if (!jobTitle || !jobLevel || !jobLanguages || !jobTools) {
      alert('Please complete all fields.');
      return;
    }

    var newJobHTML = `
      <div class="job" data-level="${jobLevel}" data-languages="${jobLanguages}" data-tools="${jobTools}">
        <img src="${jobImage}" alt="${jobTitle} Icon" class="job-icon"> <!-- Add the image here -->
        <h2>${jobTitle}</h2>
        <p>${jobLevel} Level</p>
        <p>${jobLanguages}</p>
        <p>${jobTools}</p>
        <button class="delete-button">Delete</button>
      </div>
    `;

    $('.job-listings').append(newJobHTML);
    $('#addJobModal').fadeOut();
    $('#addJobForm')[0].reset();
  });

  $('#addJobModal .close-button').click(function() {
    $('#addJobModal').fadeOut();
  });

  $(document).on('click', '.delete-button', function(e) {
    e.stopPropagation();
    var job = $(this).closest('.job');
    job.remove();
  });
});
