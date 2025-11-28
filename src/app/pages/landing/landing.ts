import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../features/dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isPlatformBrowser } from '@angular/common';
import { ContactService } from '../../core/services/contact.service';
import { Expertise } from '../../core/models/expertise.model';
import { UtilsService } from '../../core/services/utils.service';


@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing implements AfterViewInit, OnDestroy, OnInit {
  private pieces: HTMLElement[] = [];
  private intervalId: any;
  private current = 0;

  messageForm!: FormGroup;
  sending: boolean = false;

  heroTexts = [
    `Welcome to GoldenRoyal Legal Practitioners. You are at the centre of our existence.`,
    `We tailor our legal services to your personal and business needs.`,
    `Ride with us for an outstanding legal journey. Grab a glass and toast to excellence.`
  ];

  expertise = [
    {
      icon: '/assets/icons/gen-lit.svg',
      title: 'General Litigation',
      description: `Whether your legal dispute is criminal or civil, our lawyers are adept at giving excellent court representation. We have wealth of experience in all trial courts, including magistrate court, high courts, the Federal High Court and the National Industrial Court. We have an excellent knowledge of the rules of courts for civil proceedings and criminal procedure laws of the different trial courts in Nigeria. We are also very tactical in handling appeal cases at both the Court of Appeal and the Supreme Court. Are you the claimant, complaint, petitioner, applicant, defendant or respondent? Feel free to reach us to handle your brief in court. <br><br> Our litigation areas are not restricted. We have been involved in different cases, both criminal and civil. For civil matters, fundamental human right cases, matrimonial proceedings, debt recovery, real estate litigation, breach of contracts and other commercial transactions have been our major areas in the past, and we are willing and able to explore new grounds.`
    },
    {
      icon: '../../../assets/icons/business.svg',
      title: 'Business Advisory and Regulatory Compliance',
      description: 'Our expert lawyers have successfully advised different businesses and companies on issues relating to regulatory compliance and corporate governance. At different times, we have been engaged for the incorporation of both local and foreign companies in Nigeria, ensuring that the legal and regulatory frameworks are adequately complied with. In addition to incorporation, we have offered legal advice on issues relating to board composition, appointment and removal of directors and secretaries, appointment of auditors, statutory filings, taxation and foreign participation in businesses in Nigeria. <br><br> Significantly, we have assisted both small.and large companies with due diligence in many fronts. We have helped companies to ensure diligence in complying with annual filings, board resolutions, partnerships, etc. Our lawyers are keen on ensuring that your business leaves no stone unturned in meeting up with statutory requirements for continued existence and avoidance of liabilities.'
    },
    {
      icon: '../../../assets/icons/home.svg',
      title: 'Property Law Practice',
      description: `Although Nigerian laws on real estate transactions are diverse, our lawyers have successfully mastered these laws and can successfully navigate them without struggle. Our experts are adept at conducting searches and investigations on title and ownership of real properties. In addition, our experts understand the requirements for the acquisition of properties and Certificate of Occupancy across all states in Nigeria. We have an unfettered knowledge of all the taxes and charges that property owners, sellers and buyers are required to pay in Nigeria. You can be certain that we do due diligence in all transactions that involve our clients. <br><br>
        Property documentation is one major area of our real estate practice. We understand all the documents that are needed for transfer of title permanently or temporarily. Mortgage, lease, sales and assignment documents are within our area of expertise in real estate. We do not only draft these documents, our experts also ensure that they are properly registered with the appropriate government agencies as required by law. <br><br>
        We have made a mark in real estate litigation. We have successfully challenged and defended titles to different real properties in Nigeria, both for companies and individuals. We understand the terrain and we have demonstrated this understanding in protecting the title of our numerous clients.`
    },
    {
      icon: '../../../assets/icons/family.svg',
      title: 'Family Law Practice',
      description: `Our lawyers stand out in administration of estate. We understand the processes involved in obtaining probate of different kinds. We have helped our numerous clients to ensure that they have access to the estate of their loved ones after their demise. Whether it is appointment of administrator and executors, applying for letter of administration, etc, we have done it repeatedly and we know the process like the back of our palm. <br><br>
        Writing a Will is another thing we do with ease. We understand how important it is for your properties to be distributed according to your wish, and we ensure that we prepare your Will to reflect this your cherished wish. <br><br>
        Family law litigation is convenient for us. We understand the customary succession law of many tribes in Nigeria, and we have successfully argued these customs in court. Whether you are to challenge a Will, object to probate application or challenge the appointment of an administrator, we have you covered. While marriage is a sacred institution, we are certain that being out of marriage is better than losing one's life in it. We have successfully handled divorce cases across states of the federation.`
    },
    {
      icon: '../../../assets/icons/labor.svg',
      title: 'Labour and Employment Law',
      description: `Our expert lawyers understand the laws governing industrial relations in Nigeria. We have handled cases dealing with unlawful termination of employment, rights of employees and employers, etc. We adopt the best strategies to ensure that the best result is achieved from every dispute without having to resort to litigation. For employment litigation, we have represented firms and individuals in several cases at the National Industrial Court of Nigeria.`
    },
    {
      icon: '../../../assets/icons/intel.svg',
      title: 'Intellectual Property Law',
      description: `Are you looking to register your trademark, copyright, patent or industrial designs? Do you have any of your intellectual property rights infringed? Look no further! We have wealth of experience in this practice area, and we are certain that we will offer you the best services in the industry.`
    }
  ];

  partner = [
    {
      icon: '/assets/icons/proven.svg',
      title: 'Proven Expertise',
      description: 'Decades of combined legal experience across diverse practice areas with a track record of successful outcomes.'
    },
    {
      icon: '/assets/icons/tailored.svg',
      title: 'Tailored Solutions',
      description: 'Personalized legal strategies designed specifically for your unique needs and circumstances.'
    },
    {
      icon: '/assets/icons/time.svg',
      title: 'Time Efficiency',
      description: 'Swift and responsive service delivery ensuring your legal matters are handled promptly and professionally.'
    },
    {
      icon: '/assets/icons/intern.svg',
      title: 'International Standards',
      description: 'Legal services aligned with global best practices while maintaining deep local market knowledge.'
    },
    {
      icon: '/assets/icons/strat.svg',
      title: 'Strategic Litigation',
      description: 'Sophisticated courtroom advocacy combined with strategic negotiation to achieve optimal results.'
    },
    {
      icon: '/assets/icons/corp.svg',
      title: 'Corporate Experience',
      description: 'Extensive experience serving businesses from startups to established corporations across industries.'
    }
  ];

  offices = [
    {
      icon: "/assets/icons/location.svg",
      state: "Lagos Office",
      address: "210, Ipaja Road, Ipaja, Lagos State, Nigeria"
    },
    {
      icon: "/assets/icons/location.svg",
      state: "Ogun Office",
      address: "8, Powerline Street, Iyana-Iyesi, Ota, Ogun State, Nigeria"
    }
  ];

  contact = [
    {
      icon: "/assets/icons/email.svg",
      mode: "Email",
      address: "goldenroyal@gmail.com"
    },
    {
      icon: "/assets/icons/phone.svg",
      mode: "Phone Number",
      address: "+23456789010"
    }
  ]

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private snack: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object,
    private contactService: ContactService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.messageForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      message: ['', [Validators.required, Validators.maxLength(2000)]]
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return; // <-- SSR-safe

    try {
      const nodeList = document.querySelectorAll<HTMLElement>('.hero-text-piece');
      this.pieces = Array.from(nodeList);

      if (this.pieces.length === 0) return;

      this.pieces[0].classList.add('active');

      const displayMs = 4000;
      const transitionBuffer = 500;

      this.intervalId = setInterval(() => this.showNext(), displayMs + transitionBuffer);
    } catch (e) {
      console.error('Error initializing hero text rotation:', e);
    }
  }

  private showNext() {
    if (!this.pieces || this.pieces.length === 0) return;

    this.pieces[this.current].classList.remove('active');

    this.current = (this.current + 1) % this.pieces.length;

    this.pieces[this.current].classList.add('active');
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  openDialog(text: Expertise) {
    this.dialog.open(DialogComponent, {
      data: text,
      width: '500px',
      maxWidth: '80vw',
      maxHeight: '80vh'
    });
  }

  scrollTo(target: string) {
    this.utils.scrollTo(target);
    // this.mobileMenuOpen = false;
    // this.activeSection = target;
  }

  onSubmit () {
    if(this.messageForm.invalid) return;
    this.sending = true;

    this.contactService.sendContact(this.messageForm.value).subscribe({
      next: () => {
        this.sending = false;
        this.snack.open('Message sent successfully!', 'Close', {
          duration: 3000
        });
        this.messageForm.reset();
      },
      error: (err) => {
        this.sending = false;
        this.snack.open('Failed to send message. Please try again.', 'Close', {
          duration: 3000
        });
        console.error('Send error', err);
      }
    })
  }
}
