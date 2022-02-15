//When you select the fullName from the selection list - the form details of selected person is populated.
$(document).ready(function () {
  $('#fullName')
      .on('change', function () {
          // $('.data').remove();
          var users = JSON.parse(localStorage.getItem('formData')) || [];
          var userName = $('#fullName').val();
          //console.log('name select change +++', userName);
          if (users.length && userName != 'fullName') {
              var outputData = users.filter(function (item) {
                  return item.fullName == userName;
              });
              //console.log('filtered +++', outputData);
              $('.data').remove();
              var output = document.querySelector('#output');
              output.innerHTML = '';
              outputData.forEach((data) => {
                  output.innerHTML = `
                      <form  class= "data">
                          <img src='./assets/images/${data.photo}' />
                          <p ><b>Full Name</b><span>${data.fullName} </span></p>
                          <p ><b>Email</b><span> ${data.email}</span></p>
                          <p ><b>Phone</b><span> ${data.phone}</span></p>
                          <p><b>Address</b><span>${data.address} </span></p>
                          <p ><b>City, State, Zip</b><span> &nbsp${data.zip}</span><span> &nbsp ${data.state}</span><span>, </span> <span>${data.city} <span></p>
                          <button type="button" id="newSessionBtn" class="btn btn-outline-primary">New Session</button>
                      </form>`;
              });
//A new session button is accessible within the existing client form that open the add new event form on the calendar.              
              $('#newSessionBtn').click(function () {
                  //console.log('new session button +++');
                  $('#formDiv').show();
              });
          }
          $('#' + $(this).val()).fadeIn(700);
      })
      .change();
});
//When the button is clicked the new client input form is opened.
$(document).ready(function () {
  $('#newClientBtn').click(function () {
      $('#newClientInput').toggle(500);
  });
  //A new session button is accessible within the existing client form that open the add new event form on the calendar.
  $('#newSessionBtn').click(function () {
      //console.log('new session button +++');
      $('#formDiv').show();
  });
});
//New client data is submitted to local storage and output is populated to the existing client form.
const signUp = (e) => {
  let formData = JSON.parse(localStorage.getItem('formData')) || [];
  let exist =
      formData.length &&
      JSON.parse(localStorage.getItem('formData')).some(
          (data) =>
              data.fullName.toUpperCase() ==
              document.getElementById('inputFullName').value.toUpperCase()
      );
  if (!exist) {
      formData.push({
          photo: document.getElementById('fileUpload').files[0].name,
          fullName: document.getElementById('inputFullName').value.trim(),
          email: document.getElementById('inputEmail').value.trim(),
          phone: document.getElementById('inputPhone').value.trim(),
          address: document.getElementById('inputAddress').value.trim(),
          zip: document.getElementById('inputZip').value.trim(),
          city: document.getElementById('inputCity').value.trim(),
          state: document.getElementById('inputState').value.trim(),
      });
      localStorage.setItem('formData', JSON.stringify(formData));
      //console.log(localStorage.getItem('formData'));
      displayData();
      document.getElementById('form').reset();
      document.getElementById('fullName').focus();
  } else {
      alert('This is a duplicate name');
  }
  e.preventDefault();
};
function displayData() {
  //console.log(localStorage.getItem('formData'));
  if (localStorage.getItem('formData')) {
      var output = document.querySelector('#output');
      output.innerHTML = '';
      JSON.parse(localStorage.getItem('formData')).forEach((data) => {
          output.innerHTML = `
              <form  class= "data">
                  <img src='./assets/images/${data.photo}' />
                  <p ><b>Full Name</b><span>${data.fullName} </span></p>
                  <p ><b>Email</b><span> ${data.email}</span></p>
                  <p pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"><b>Phone</b><span> ${data.phone}</span></p>
                  <p><b>Address</b><span>${data.address} </span></p>
                  <p ><b>City, State, Zip</b><span> &nbsp${data.zip}</span><span> &nbsp ${data.state}</span><span>, </span> <span>${data.city} <span></p>
                  <button type="button" id="newSessionBtn" class="btn btn-outline-primary">New Session</button>
              </form>`;
      });
      //New client fullNames are added to option selection list
      var selectEl = document.querySelector('#fullName');
      JSON.parse(localStorage.getItem('formData')).forEach((data) => {
          var newOption = document.createElement('option');
          newOption.value = data.fullName;
          newOption.text = data.fullName;
          selectEl.add(newOption, null);
      });
  }
  //A image upload for new client is displayed on the screen
  $(function () {
      $('#fileUpload').change(function (event) {
          var x = URL.createObjectURL(event.target.files[0]);
          $('#uploadImage').attr('src', x);
          console.log(event);
      });
  });
  fetch(
    "https://calendarific.com/api/v2/holidays?&api_key=4af538b9d1e8f0eeccdf1b51f275ed44a13b9b90&country=US&year=2022&month=2&type=national"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(data.response.holidays[0].name);
      console.log(data.response.holidays[0].date.iso);
      var holidays = document.getElementById("holidays");
      var holidayList = document.createElement("p");
      holidayList.textContent =
        data.response.holidays[0].name +
        " " +
        data.response.holidays[0].date.iso;
      holidays.appendChild(holidayList);
    });
    fetch(
      "https://api.giphy.com/v1/gifs/search?&q=fitness&api_key=iow5y3XECG4SVeN9vHRNANKzmFDXWWTY"
    )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data)
      var gifObj = []
        for (var i = 0; i < 50; i++) {
          var gifResult = []
            gifResult = data.data[i].images.preview_gif.url;
            gifObj.push(gifResult);
            //var loopEnd = Math.floor(Math.random() * 50 + 1)
        }
        var randomGif = gifObj[Math.floor(Math.random() * gifObj.length)];
        console.log(randomGif)  
        console.log(gifObj)
      //console.log(data.data[i].images.preview_gif.url);
      // console.log(data.data[0].images.downsize_medium.url);
      var fitness = document.getElementById("fitness");
      var fitnessList = document.createElement("div");
	  fitnessList.className = "gif";
      fitnessList.innerHTML= `<img src= '${randomGif}' />`
      //fitnessList.setAttribute("src", "data.data[i].images.preview_gif.url");
      fitness.append(fitnessList);
    });
}
displayData();

// var inputImage = document.getElementById('inputImage');
// var uploadedImage = '';
// inputImage.addEventListener('change', function () {
// 	var reader = new FileReader();
// 	reader.addEventListener('load', () => {
// 		uploadedImage = reader.result;
// 		document.querySelector(
// 			'#displayImage'
// 		).style.backgroundImage = `url(${uploadedImage})`;
// 	});
// 	reader.readAsDataURL(this.files[0]);
// });

//Calendar Code
window.document.onload = myFunc();

function closeForm() {
  var x = document.getElementById("formDiv");
  var y = document.getElementsByClassName("addBTN")[0];
  x.style.display = "none";
  y.style.transform = "rotate(90deg)";
}

// Start
$("#calendar").innerHTML = calendar();

// short queySelector
function _(s) {
  return document.querySelector(s);
}

function toggleForm() {
  var x = document.getElementById("formDiv");
  var y = document.getElementsByClassName("addBTN")[0];
  if (x.style.display == "none") {
    x.style.display = "block";
    y.style.transform = "rotate(45deg)";
  } else {
    x.style.display = "none";
    y.style.transform = "rotate(90deg)";
  }
}

function displayCol() {
	var eventType = document.myForm.eventType.value;
	var eventColor = '';
	switch (eventType) {
		case 'Yoga':
			eventColor = 'rgba(156, 202, 235, 1)';
			break;
		  case 'Cardio':
			eventColor = 'rgba(247, 167, 0, 1)';
			break;
		  case 'Lower Body':
			eventColor = 'rgba(249, 233, 0, 1)';
			break;
		  case 'Upper Body':
			eventColor = 'rgb(128,0,128)';
			break;
		  case 'Full Body':
			eventColor = 'rgb(0,255,255)';
			break;
		  default:
			eventColor = 'rgba(153, 198, 109, 1)';
	}
	$('#eventColor').css('background', eventColor);
}

function myFunc() {
	var today = moment();
	function Calendar(selector, events) {
		this.el = document.querySelector(selector);
		this.events = events;
		this.current = moment().date(1);
		if (this.el.innerHTML != '') {
			this.el.innerHTML = '';
			this.draw();
		} else {
			this.draw();
		}

		var current = document.querySelector('.today');

		if (current) {
			var self = this;
			window.setTimeout(function () {
				self.openDay(current);
			}, 500);
		}
	}

	Calendar.prototype.draw = function () {
		//Create Header
		this.drawHeader();

		//Draw Month
		this.drawMonth();
		this.drawButton();
		this.drawLegend();
	};

	Calendar.prototype.drawHeader = function () {
		var self = this;
		if (!this.header) {
			//Create the header elements
			this.header = createElement('div', 'header');
			this.header.className = 'header';
			this.title = createElement('h1');
			var right = createElement('div', 'right');
			right.addEventListener('click', function () {
				self.nextMonth();
			});

			var left = createElement('div', 'left');
			left.addEventListener('click', function () {
				self.prevMonth();
			});

			//Append the Elements
			this.header.appendChild(this.title);
			this.header.appendChild(right);
			this.header.appendChild(left);
			this.el.appendChild(this.header);
		}

		this.title.innerHTML = this.current.format('MMMM YYYY');
	};

	Calendar.prototype.drawMonth = function () {
		var self = this;
		this.events.forEach(function (ev) {
			ev.date = moment(ev.date, 'YYYY-MM-DD');
		});

		if (this.month) {
			this.oldMonth = this.month;
			this.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');
			this.oldMonth.addEventListener('webkitAnimationEnd', function () {
				self.oldMonth.parentNode.removeChild(self.oldMonth);
				self.month = createElement('div', 'month');
				self.backFill();
				self.currentMonth();
				self.fowardFill();
				self.el.appendChild(self.month);
				window.setTimeout(function () {
					self.month.className = 'month in ' + (self.next ? 'next' : 'prev');
				}, 16);
			});
		} else {
			this.month = createElement('div', 'month');
			this.el.appendChild(this.month);
			this.backFill();
			this.currentMonth();
			this.fowardFill();
			this.month.className = 'month new';
		}
	};

	Calendar.prototype.backFill = function () {
		var clone = this.current.clone();
		var dayOfWeek = clone.day();
		if (!dayOfWeek) {
			return;
		}

		clone.subtract(dayOfWeek + 1, 'days');
		for (var i = dayOfWeek; i > 0; i--) {
			this.drawDay(clone.add(1, 'days'));
		}
	};

	Calendar.prototype.fowardFill = function () {
		var clone = this.current.clone().add(1, 'months').subtract(1, 'days');
		var dayOfWeek = clone.day();

		if (dayOfWeek === 6) {
			return;
		}

		for (var i = dayOfWeek; i < 6; i++) {
			this.drawDay(clone.add(1, 'days'));
		}
	};

	Calendar.prototype.currentMonth = function () {
		var clone = this.current.clone();
		while (clone.month() === this.current.month()) {
			this.drawDay(clone);
			clone.add(1, 'days');
		}
	};

	Calendar.prototype.getWeek = function (day) {
		if (!this.week || day.day() === 0) {
			this.week = createElement('div', 'week');
			this.month.appendChild(this.week);
		}
	};

	Calendar.prototype.drawDay = function (day) {
		var self = this;
		this.getWeek(day);

		//Outer Day
		var outer = createElement('div', this.getDayClass(day));

		if (outer.className.indexOf('other') == -1) {
			outer.addEventListener('click', function () {
				self.openDay(this);
			});
		}

		//Day Name
		var name = createElement('div', 'day-name', day.format('ddd'));

		//Day Number
		var number = createElement('div', 'day-number', day.format('DD'));

		//Events
		var events = createElement('div', 'day-events');

		this.drawEvents(day, events);
		outer.appendChild(name);
		outer.appendChild(number);
		outer.appendChild(events);
		this.week.appendChild(outer);
	};

	Calendar.prototype.drawEvents = function (day, element) {
		if (day.month() === this.current.month()) {
			var todaysEvents = this.events.reduce(function (memo, ev) {
				if (ev.date.isSame(day, 'day')) {
					memo.push(ev);
				}
				return memo;
			}, []);

			todaysEvents.forEach(function (ev) {
				var evSpan = createElement('span', ev.color);
				element.appendChild(evSpan);
			});
		}
	};

	Calendar.prototype.getDayClass = function (day) {
		classes = ['day'];
		if (day.month() !== this.current.month()) {
			classes.push('other');
		} else if (today.isSame(day, 'day')) {
			classes.push('today');
		}

		return classes.join(' ');
	};

	Calendar.prototype.openDay = function (el) {
		var details, arrow;
		var dayNumber =
			+el.querySelectorAll('.day-number')[0].innerText ||
			+el.querySelectorAll('.day-number')[0].textContent;
		var day = this.current.clone().date(dayNumber);
		var currentOpened = document.querySelector('.details');

		//Check to see if there is an open detais box on the current row
		// if (currentOpened && currentOpened.parentNode === el.parentNode) {
		//   details = currentOpened;
		//   arrow = document.querySelector(".arrow");
		// } else {
		//Close the open events on differnt week row
		//currentOpened && currentOpened.parentNode.removeChild(currentOpened);
		if (currentOpened) {
			currentOpened.addEventListener('webkitAnimationEnd', function () {
				currentOpened.parentNode.removeChild(currentOpened);
			});

			currentOpened.addEventListener('oanimationend', function () {
				currentOpened.parentNode.removeChild(currentOpened);
			});

			currentOpened.addEventListener('msAnimationEnd', function () {
				currentOpened.parentNode.removeChild(currentOpened);
			});

			currentOpened.addEventListener('animationend', function () {
				currentOpened.parentNode.removeChild(currentOpened);
			});

			currentOpened.className = 'details out';
		}

		//Create the Details Container
		details = createElement('div', 'details in');

		var group1 = createElement('div', 'detailsHeader');
		var todayDate = createElement('div', 'todayDate', el.innerText);
		//Create the arrow
		//                            var arrow = createElement('div', 'arrow');

		//Create the event wrapper
		//                            details.appendChild(arrow);
		group1.appendChild(todayDate);
		details.appendChild(group1);
		el.parentNode.parentNode.insertBefore(
			details,
			el.parentNode.parentNode.childNodes[0]
		);
		// }

		var todaysEvents = this.events.reduce(function (memo, ev) {
			if (ev.date.isSame(day, 'day')) {
				memo.push(ev);
			}

			return memo;
		}, []);

		this.renderEvents(todaysEvents, details);

		// arrow.style.left = el.offsetLeft - el.parentNode.offsetLeft + 27 + "px";
	};

	Calendar.prototype.renderEvents = function (events, ele) {
		//Remove any events in the current details element
		var currentWrapper = ele.querySelector('.events');
		var wrapper = createElement(
			'div',
			'events in' + (currentWrapper ? ' new' : '')
		);

		events.forEach(function (ev) {
			var div = createElement('div', 'event');
			var group1 = createElement('div', 'eventgrp');
			var group2 = createElement('div', 'eventgrp');
			var group3 = createElement('div', 'eventTime');
			var square = createElement('div', 'event-category ' + ev.color);
			var span = createElement('span', '', ev.eventName);
			var del = createElement('button', 'delBTN', 'x');
			group1.appendChild(square);
			group1.appendChild(span);
			group2.appendChild(del);
			div.appendChild(group1);
			div.appendChild(group2);
			del.addEventListener('click', function () {
				delEvent(ev);
			});
			wrapper.appendChild(div);
		});

		if (!events.length) {
			var div = createElement('div', 'event empty');
			var span = createElement('span', '', 'No Events');
			div.appendChild(span);
			wrapper.appendChild(div);
		}

		if (currentWrapper) {
			currentWrapper.className = 'events out';
			currentWrapper.addEventListener('webkitAnimationEnd', function () {
				currentWrapper.parentNode.removeChild(currentWrapper);
				ele.appendChild(wrapper);
			});

			currentWrapper.addEventListener('oanimationend', function () {
				currentWrapper.parentNode.removeChild(currentWrapper);
				ele.appendChild(wrapper);
			});

			currentWrapper.addEventListener('msAnimationEnd', function () {
				currentWrapper.parentNode.removeChild(currentWrapper);
				ele.appendChild(wrapper);
			});

			currentWrapper.addEventListener('animationend', function () {
				currentWrapper.parentNode.removeChild(currentWrapper);
				ele.appendChild(wrapper);
			});
		} else {
			ele.appendChild(wrapper);
		}
	};

	Calendar.prototype.drawLegend = function () {
		var legend = createElement('div', 'legend');
		var calendars = this.events
			.map(function (e) {
				return e.calendar + '|' + e.color;
			})
			.reduce(function (memo, e) {
				if (memo.indexOf(e) === -1) {
					memo.push(e);
				}
				return memo;
			}, [])
			.forEach(function (e) {
				var parts = e.split('|');
				var entry = createElement('span', 'entry ' + parts[1], parts[0]);
				legend.appendChild(entry);
			});
		var legendDOM = document.getElementsByClassName('legend');
		if (legendDOM.length != 0) {
			this.el.replaceChild(legend, legendDOM[0]);
		} else {
			this.el.appendChild(legend);
		}
	};

	Calendar.prototype.drawButton = function () {
		var addBTN = document.querySelector('.addBTN');
		if (addBTN == null) {
			addBTN = createElement('div', 'addBTN');
			addBTN.addEventListener('click', function () {
				toggleForm();
			});
		}
		this.el.appendChild(addBTN);
	};

	Calendar.prototype.nextMonth = function () {
		this.current.add(1, 'months');
		this.next = true;

		this.draw();
		closeForm();

		var self = this;
		window.setTimeout(function () {
			var today = document.querySelector('.today');
			var first = document.querySelector('.day:not(.other)');
			if (today) {
				window.setTimeout(function () {
					self.openDay(today);
				}, 500);
			} else {
				window.setTimeout(function () {
					self.openDay(first);
				}, 500);
			}
		}, 500);
	};

	Calendar.prototype.prevMonth = function () {
		this.current.subtract(1, 'months');
		this.next = false;

		this.draw();
		closeForm();
		var self = this;
		window.setTimeout(function () {
			var today = document.querySelector('.today');
			var first = document.querySelector('.day:not(.other)');
			if (today) {
				window.setTimeout(function () {
					self.openDay(today);
				}, 500);
			} else {
				window.setTimeout(function () {
					self.openDay(first);
				}, 500);
			}
		}, 500);
	};

	window.Calendar = Calendar;

	function createElement(tagName, className, innerText) {
		var ele = document.createElement(tagName);
		if (className) {
			ele.className = className;
		}

		if (innerText) {
			ele.innderText = ele.textContent = innerText;
		}

		return ele;
	}

	var eventName = document.myForm.eventName.value;
	var eventType = document.myForm.eventType.value;
	var eventColor = '';
	var eventDate = document.myForm.eventDate.value;
	var eventTime = document.myForm.eventTime.value;

	switch (eventType) {
		case 'Yoga':
			eventColor = 'blue';
			break;
		  case 'Cardio':
			eventColor = 'orange';
			break;
		  case 'Lower Body':
			eventColor = 'yellow';
			break;
		  case 'Upper Body':
			eventColor = 'purple';
			break;
		  case 'Full Body':
			eventColor = 'cyan';
			break;
		  default:
			eventColor = 'green';
	}
	var data = JSON.parse(localStorage.getItem('data'));

	if (data == null) data = [];

	if (eventName != '' && eventType != '' && eventColor != '' && eventDate != '' && eventTime != '')
		data.push({
			eventName: eventName,
			calendar: eventType,
			color: eventColor,
			date: eventDate,
			time: eventTime,
		});
	for (var a of data) {
		console.log(a);
	}
	localStorage.setItem('data', JSON.stringify(data));

	/*var data = [
          {eventName: 'Lunch Meeting 1', calendar: 'Home', color: 'blue', date: '2019-06-25'}
        ];*/

  function delEvent(events) {
    var a = data.indexOf(events);
    var b = confirm(
      "Confirm to remove event with information: \nTitle: " +
        events.eventName +
        "\nType: " +
        events.calendar +
        "\nDate: " +
        events.date._i +
        "?"
    );
    if (b) {
      var c = data.splice(a, 1);
      /*for(var z in data)
                          console.log(z);*/
			localStorage.setItem('data', JSON.stringify(data));

			//Check here for removing alerts
			for (var a of data) {
				console.log(a);
			}
			var calendar = new Calendar('#calendar', data);
			if (c) {
				alert('Event deleted successfully');
			} else {
				alert('Failed to delete event');
			}
		} else {
			//alert("Cancelled deletion");
		}
	}

	var calendar = new Calendar('#calendar', data);

	document.myForm.eventName.value = '';
	document.myForm.eventType.value = '';
	document.myForm.eventDate.value = '';
	document.myForm.eventTime.value = '';

	toggleForm();
}

//   Get Json data
function getjson(url, callback) {
  var self = this,
    ajax = new XMLHttpRequest();
  ajax.open("GET", url, true);
  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4) {
      if (ajax.status == 200) {
        var data = JSON.parse(ajax.responseText);
        return callback(data);
      } else {
        console.log(ajax.status);
      }
    }
  };
  ajax.send();
}
