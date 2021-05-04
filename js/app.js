Vue.component('faqList', {
	template: `
		<div>
			<faq v-for="item in faqs" :question="item.question" :answer="item.answer" :key="item.id" ></faq>
		</div>
	`,
	data(){
		return {
			faqs: [
				{
					id: 0,
					question: "I live outside of Calgary, is out of town service available?",
					answer: "Yes! Our car recycling service is available for residents of Airdrie, Chestermere, Okotoks, Cochrane, and more."
				},
				{
					id: 1,
					question: "Will you pay cash for my damaged, rusted, non-running vehicles?",
					answer: "Yes! We will make an offer on just about any scrap vehicle."
				},
				{
					id: 2,
					question: "Do you sell used car parts?",
					answer: "No! We do not sell car parts, we exclusively recycle vehicles down in to raw materials for remanufacturing."
				}
			]
		}
	}
});

Vue.component('faq', {
	props: ['question','answer'],
	template: `
		<div class="faq column is-8-desktop is-offset-2-desktop">
			<div>
				<i class="fa fa-question"></i>
			</div>
			<div>
				<h4>{{ question }}</h4>
				<p>
					{{ answer }}
				</p>
			</div>
		</div>
	`
});

Vue.component('testimonials-slider', {
	props: [],
	template: `
		<div class="slider-wrapper">
			<i @click="prevSlide" class="fa fa-caret-left prev is-hidden-desktop"></i>
			<i @click="nextSlide" class="fa fa-caret-right next is-hidden-desktop"></i>
			<div class="columns testimonials-wrapper">
				<testimonial
					v-for="(item, index) in testimonials"
					:key="item.id"
					:slideId="item.id"
					:name="item.name"
					:city="item.city"
					:comment="item.comment"
					:img="item.img"
					:currentSlide="currentSlide">
				</testimonial>
			</div>
		</div>
	`,
	methods: {
		prevSlide(){
			this.goToSlide(this.currentSlide-1);
		},
		nextSlide(){
			this.goToSlide(this.currentSlide+1);
		},
		goToSlide(k){
			if(k >= (this.$children.length)) {
				this.currentSlide = 0;
			} else if ( k < 0){
				this.currentSlide = (this.$children.length - 1);
			} else {
				this.currentSlide = k;
			}
		}
	},
	data(){
		return {
			currentSlide: 0,
			newSlide: null,
			testimonials: [
				{
					id: 0,
					name: 'Brad',
					city: 'Calgary',
					comment: 'These guys made the best offer on my old damaged car. Showed up with cash as promised, and took it away with no hassle.',
					img: './img/testimonials/brad.jpg'
				},
				{
					id: 1,
					name: 'Melissa',
					city: 'Chestermere',
					comment: 'I am very satisfied with Retire My Ride. The service was friendly and punctual.',
					img: './img/testimonials/melissa.jpg'
				},
				{
					id: 2,
					name: 'Moaz',
					city: 'Calgary',
					comment: 'I thought it was going to cost money to recycle my vehicle. Retire My Ride gave me cash instead 10/10',
					img: './img/testimonials/moaz.jpg'
				}
			]
		}
	}
});

Vue.component('testimonial', {
	props: ['slideId', 'name', 'city', 'comment', 'img', 'currentSlide'],
	computed: {
		lowerCaseName(){
			return this.name.toLowerCase();
		},
		isShowing(){
			return this.currentSlide == this.slideId;
		}
	},
	template: `
		<div class="testimonial has-text-centered column" v-show="isShowing">


			<h4 class="is-size-4">{{ name }}</h4>
			<h5 class="is-size-7">{{ city }}</h5>
			<p>
				<i class="fa fa-quote-left"></i>
				{{ comment }}
				<i class="fa fa-quote-right"></i>
			</p>
		</div>
	`,
	data(){
		return {
			showing: 0
		}
	}
});


new Vue({
	el: '#app',
	data: {
		contact: {
			name: '',
			email: '',
			phone: '',
			message: ''
		},
		submitted: false,
		contactFormNotice: null,
		contactSuccess: null
	},
	methods: {
		goHome(){
			window.scrollTo(0,0)
		},
		makeLowerCase(text){
			return text.toLowerCase();
		},
		submitContactForm(){
			var self = this;
			axios.post('/contact-form-handler.php', this.contact)
			.then(function(response){
				self.submitted = true;
				if(response.data.status == 'success'){
					self.contactSuccess = true;
					self.contactFormNotice = 'Your message has been delivered, we will be in touch as soon as possible!';
					gtag_report_conversion();	// record Google conversion
				} else {
					self.contactSuccess = false;
					self.contactFormNotice = 'There was an error delivering your message. Please call us directly at (403) 619-3415';
				}

			})
			.catch(function(error){
				console.log(error);
			});
		}
	}
});
