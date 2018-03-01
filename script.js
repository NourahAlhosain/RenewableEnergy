
	//to open links in new window
	$("a").attr("target", "_blank");

	$("#arrow1").click(function () {
		$('html, body').animate({
			scrollTop: $("#section-4").offset().top
		}, 2000);
	});
	$("#arrow2").click(function () {
		$('html, body').animate({
			scrollTop: $("#section-5").offset().top
		}, 2000);
	});
	$("#arrow3").click(function () {
		$('html, body').animate({
			scrollTop: $("#section-7").offset().top
		}, 2000);
	});
	$("#arrow4").click(function () {
		$('html, body').animate({
			scrollTop: $("#section-8").offset().top
		}, 2000);
	});

	$("#info").hover(function () {
		$(this).css('cursor', 'pointer').attr('title', 'Go to data source');
	}, function () {
		$(this).css('cursor', 'auto');
	});

	var velocity = 0.5;

	function update() {
		var pos = $(window).scrollTop();
		$('.parallax').each(function () {
			var $element = $(this);
			// subtract some from the height b/c of the padding
			var height = $element.height() - 18;
			$(this).css('backgroundPosition', '100%' + Math.round((pos - 200) * velocity) + 'px');

		});
	};

	$(window).bind('scroll', update);

	function moveRight() {
		$("#c2").animate({ left: "+=1500" }, 10000, moveLeft)
		$("#c1").animate({ left: "-=1500" }, 20000, moveRight)
		$("#c3").animate({ left: "+=900" }, 20000, moveLeft)

	}

	function moveLeft() {
		$("#c2").animate({ left: "-=1500" }, 20000, moveRight)
		$("#c1").animate({ left: "+=1500" }, 20000, moveLeft)
		$("#c3").animate({ left: "-=1000" }, 20000, moveRight)


	}

	$(document).ready(function () {

		moveRight();

	});

	window.sr = ScrollReveal({ reset: true });
	sr.reveal('.result', { duration: 2000 });
	sr.reveal('.section-4-cont', { duration: 2000 });

	$('.js-count').each(function () {
		$(this).prop('Counter', 0).animate({
			Counter: $(this).data('number')
		}, {
				duration: 4000,
				easing: 'swing',
				step: function (now) {

					$(this).text(Math.ceil(now).toLocaleString('en'));
				}
			});

	});
	function drawCrates() {
		var delayms = 500;
		for (i = 0; i < 6; i++) {

			var crate_img = document.createElement("IMG");
			crate_img.setAttribute("src", "pics/man.png");
			crate_img.setAttribute("id", "employee" + i);
			crate_img.setAttribute("class", "results-icons");
			document.getElementById("emplyment").appendChild(crate_img);
			sr.reveal('#employee' + i, { delay: delayms });
			setTimeout(function () {
				document.getElementById("employee" + i)
			}, 1000);


		}
		for (i = 0; i < 6; i++) {
			var crate_img = document.createElement("IMG");
			crate_img.setAttribute("src", "pics/wo.png");
			crate_img.setAttribute("id", "employee" + i);
			crate_img.setAttribute("class", "results-icons");
			document.getElementById("emplyment").appendChild(crate_img);
			sr.reveal('#employee' + i, { delay: delayms });
			delayms = delayms + 200;
			setTimeout(function () {
				document.getElementById("employee" + i)
			}, 1000);


		}

		delayms = 500;
		for (i = 0; i < 10; i++) {

			var crate_img = document.createElement("IMG");
			crate_img.setAttribute("src", "pics/drop-silhouette.png");
			crate_img.setAttribute("id", "water" + i);
			crate_img.setAttribute("class", "results-icons");
			document.getElementById("water").appendChild(crate_img);
			sr.reveal('#water' + i, { delay: delayms });
			delayms = delayms + 200;
			setTimeout(function () {
				document.getElementById("water" + i)			
}, 1000);

		}

		delayms = 500;
		for (i = 0; i < 10; i++) {

			var crate_img = document.createElement("IMG");
			crate_img.setAttribute("src", "pics/barrels.png");
			crate_img.setAttribute("id", "oil" + i);
			crate_img.setAttribute("class", "results-icons");
			document.getElementById("oil").appendChild(crate_img);
			sr.reveal('#oil' + i, { delay: delayms });
			delayms = delayms + 200;
			setTimeout(function () {
				document.getElementById("oil" + i)
			}, 1000);

		}

	}
	drawCrates();
	$(".years-btns > .btn").click(function () {
		$(".years-btns > .btn").removeClass("active");
		$(this).addClass("active");
	});

	$(".countries-btns > .btn").click(function () {
		$(".countries-btns> .btn").removeClass("active");
		$(this).addClass("active");
	});

	$('.fuel-savings').hide();
	$('.emmission-savings').hide();
	$('.country-target').hide();
	$('.link').click(function () {
		$('.emmission-savings').hide();
		$('.fuel-savings').hide();
		$('.fuel-savings[data-link=' + $(this).data('link') + ']').fadeIn({
			width: '200px'
		}, 300);
		$('.emmission-savings[data-link=' + $(this).data('link') + ']').fadeIn({
			width: '200px'
		}, 300);
	});

	$('.c-link').click(function () {
		$('.country-target').hide();
		$('.country-target[data-link=' + $(this).data('link') + ']').fadeIn({
			width: '200px'
		}, 300);
	});

	//d3 Chart, get data dynamically from ODS's API

	d3.json('https://datasource.kapsarc.org/api/records/1.0/search/?dataset=installed-renewable-energy-capacity-2007-2016&rows=60&sort=country&facet=year&facet=country', function (error, data) {

		var obj = [];
		var dataset = [];


		var value = [];
		var value2 = [];
		var temp;
		var temp2;
		var temp3;
		var grouped = [];
		$.each(data.records, function (key, val) {
			$.each(val.fields, function (key2, val2) {
				if (key2 == "year") {

					temp = val2;
					value.push({ year: val2 });				
}
				if (key2 == "capacity_mw") {
					temp2 = val2;
					value2.push({ capacity: val2 });

				}
				if (key2 == "country") {
					temp3 = val2;
					value2.push({ country: val2 });

				}

			});
			obj.push({ country: temp3, year: temp, capacity: temp2 });
		});

		obj.forEach(function (a) {
			if (!this[a.year]) {

				this[a.year] = { data: [], type: a.year, unit: "MW" };
				grouped.push(this[a.year]);

			}
			this[a.year].data.push({ cat: a.country, val: a.capacity });

		}, Object.create(null));

		grouped.forEach(function (a) {
			if (a.type == 2012) {
				dataset[0] = a;
			}
			else if (a.type == 2014) {
				dataset[1] = a;
			}
			else if (a.type == 2016) {
				dataset[2] = a;
			}

		});
		var totals = [];
		var capacitysum;
		var totalArray = [];
		var sum = 0;
		for (var pieNo = 0; pieNo <= 2; pieNo++) {
			capacitysum = dataset[0].data;

			for (var objNo = 0; objNo <= 5; objNo++) {
				sum = sum + capacitysum[objNo].val;

			}
			totalArray.push(sum);

		}
		var yy = dataset[0].data;
		$(function () {
			var donutData = dataset;
			var donuts = new DonutCharts();
			donuts.create(donutData);
		});


		function DonutCharts() {
			var charts = d3.select('#donut-charts');
			var legenddiv = d3.select('#donut-legend');

			var chart_m,
				chart_r;
			// color = d3.scale.category20();

			var colors = ["#57757D", "#295361", "#13272F", "#486C86", "#9FACB0", "#6F96A2"];

			var getCatNames = function (dataset) {
				var catNames = new Array();

				for (var i = 0; i < dataset[0].data.length; i++) {
					catNames.push(dataset[0].data[i].cat);
				}

				return catNames;
			}

			var createLegend = function (catNames) {
				var legends = legenddiv.select('.legend')
					.selectAll('g')
					.data(catNames)
					.enter().append('g')

					.attr('transform', function (d, i) {
						return 'translate(' + (i * 110 + 50) + ', 10)';
					});

				legends.append('circle')
					.attr('class', 'legend-icon')
					.attr('r', 6)
					.style('fill', function (d, i) {
						return colors[i];
					})
					.attr("id", function (d) { return 'legend_' + d })
					.on("mouseover", function (d, i, j) {
						for (t = 0; t < 3; t++) {
							var str = d;
							str = str.replace(/\s/g, '')
							pathAnim(d3.select("#Arc_" + str + t), 1);
							var thisDonut = charts.select('.type' + t);
							thisDonut.select('.value').text(function (d) {
								var ti = d.data;
								var ee = {}
								ee = d.data.filter(function (e) {
									return e.cat == ti[i].cat;
								});
								for (var n = 0; n < ee.length; n += 1) {

									return ee[n].val.toFixed(1) + d.unit;
								}
							});
						}
					})

					.on("mouseout", function (d, i, j) {
						for (t = 0; t < 3; t++) {
							var str = d;
							str = str.replace(/\s/g, '')
							pathAnim(d3.select("#Arc_" + str + t), 0);
							var thisDonut = charts.select('.type' + t);
							thisDonut.select('.value').text(function () {
								return totalArray[t] + " MW";
							});
						}

					});

				legends.append('text')
					.attr('dx', '1em')
					.attr('dy', '.3em')
					.text(function (d) {
						return d;
					});
			}

			var createCenter = function (pie) {
				var eventObj = {
					'mouseover': function (d, i) {
						d3.select(this)
							.transition()
							.attr("r", chart_r * 0.65);
					},
					'mouseout': function (d, i) {
						d3.select(this)
							.transition()
							.duration(500)
							.ease('bounce')
							.attr("r", chart_r * 0.6);
					},
				}

				var donuts = d3.selectAll('.donut');

				// The circle displaying total data.
				donuts.append("svg:circle")
					.attr("r", chart_r * 0.6)
					.style("fill", "#E7E7E7")
					.on(eventObj);

				donuts.append('text')
					.attr('class', 'center-txt type')
					.attr('y', chart_r * -0.16)
					.attr('text-anchor', 'middle')
					.style('font-weight', 'bold')
					.style('font-size', '30px')
					.text(function (d, i) {
						return d.type;
					});
				donuts.append('text')
					.attr('class', 'center-txt value')
					.style('font-size', '20px')
					.attr('y', chart_r * 0.26)
					.attr('text-anchor', 'middle')
					.text(function (d, i) {
						return totalArray[i] + " MW";
					});
				donuts.append('text')
					.attr('class', 'center-txt percentage')
					.attr('y', chart_r * 0.16)
					.attr('text-anchor', 'middle')
					.style('fill', '#A2A2A2');
				donuts.append('text')
					.attr('class', 'center-txt value2')
					.attr('text-anchor', 'middle');
			}

			var resetAllCenterText = function () {
				charts.selectAll('.value')
					.text(function (d) {

						return total[0] + d.unit;
					});
				charts.selectAll('.percentage')
					.text('');
			}

			var pathAnim = function (path, dir) {
				switch (dir) {
					case 0:
						path.transition()
							.duration(500)
							.ease('bounce')
							.attr('d', d3.svg.arc()
								.innerRadius(chart_r * 0.7)
								.outerRadius(chart_r)
							);
						break;

					case 1:
						path.transition()
							.attr('d', d3.svg.arc()
								.innerRadius(chart_r * 0.7)
								.outerRadius(chart_r * 1.08)
							);
						break;
				}
			}

			var updateDonut = function () {

				var eventObj = {

					'mouseover': function (d, i, j) {
						for (t = 0; t < 3; t++) {
							var str = d.data.cat;
							str = str.replace(/\s/g, '')
							pathAnim(d3.select("#Arc_" + str + t), 1);
							var str = d.data.cat;
							str = str.replace(/\s/g, '')
							var thisDonut = charts.select('.type' + t);
							thisDonut.select('.value').text(function (donut_d) {
								var ti = donut_d.data;
								var ee = {}
								ee = donut_d.data.filter(function (e) {
									return e.cat == d.data.cat;
								});
								for (var n = 0; n < ee.length; n += 1) {
									return ee[n].val.toFixed(1) + donut_d.unit;
								}
							});
						}
					},
					'mouseout': function (d, i, j) {
						var thisPath = d3.select(this);
						for (t = 0; t < 3; t++) {
							var str = d.data.cat;
							str = str.replace(/\s/g, '')
							pathAnim(d3.select("#Arc_" + str + t), 0);
							var thisDonut = charts.select('.type' + t);
							thisDonut.select('.value').text(function () {
								return totalArray[t] + " MW";
							});
						}
					},
				};

				var pie = d3.layout.pie()
					.sort(null)
					.value(function (d) {
						return d.val;
					});

				var arc = d3.svg.arc()
					.innerRadius(chart_r * 0.7)
					.outerRadius(function () {
						return (d3.select(this).classed('clicked')) ? chart_r * 1.08
							: chart_r;
					});

				// Start joining data with paths
				var paths = charts.selectAll('.donut')
					.selectAll('path')
					.data(function (d, i) {
						return pie(d.data);
					});
				paths.enter()
					.append('svg:path')
					.attr('d', arc)
					.attr('id', function (d, i, j) {
						var str = d.data.cat;

						str = str.replace(/\s/g, '')
						return 'Arc_' + str + j					
})
					.style('fill', function (d, i) {
						return colors[i];
					})
					.style('stroke', '#FFFFFF')
					.on(eventObj)
				paths.exit().remove();
			}

			this.create = function (dataset) {
				var $charts = $('#donut-charts');
				chart_m = $charts.innerWidth() / dataset.length / 3 * 0.14;
				chart_r = $charts.innerWidth() / dataset.length / 3 * 0.85;

				var legend = d3.select("#donut-legend")
					.append('svg')
					.attr('class', 'legend')
					.attr('width', '100%')
					.attr('viewBox', '0 0 700 30')
					.attr('height', 50)

				var donut = charts.selectAll('.donut')
					.data(dataset)
					.enter().append('svg:svg')
					.attr('width', (chart_r + chart_m) * 2)
					.attr('height', (chart_r + chart_m) * 2)
					.append('svg:g')
					.attr('class', function (d, i) {
						return 'donut type' + i;
					})
					.attr('transform', 'translate(' + (chart_r + chart_m) + ',' + (chart_r + chart_m) + ')');

				createLegend(getCatNames(dataset));
				createCenter();
				updateDonut();
			}

			this.update = function (dataset) {
				var donut = charts.selectAll(".donut")
					.data(dataset);
				updateDonut();
			}
		}
	});