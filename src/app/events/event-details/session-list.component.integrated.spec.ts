import { DebugElement } from "@angular/core"
import { AuthService } from "src/app/user/auth.service"
import { SessionListComponent } from "./session-list.component"
import { VoterService } from "./voter.service"
import { TestBed, ComponentFixture } from '@angular/core/testing'
import { DurationPipe } from "../shared/duration.pipe"
import { CollapsibleWellComponent } from "src/app/common"
import { UpvoteComponent } from "./upvote.component"
import { By } from "@angular/platform-browser"

describe('SessionListComponent', () => {
	let mockAuthService: any,
			mockVoterService: any,
			fixture: ComponentFixture<SessionListComponent>,
			component: SessionListComponent,
			element: HTMLElement,
			debugEl: DebugElement

	beforeEach(() => {
		mockAuthService = { isAuthenticated: () => true, currentUser: {userName: 'Joe'}};
		mockVoterService = { userHasVoted: () => true };

		TestBed.configureTestingModule({
			declarations: [
				SessionListComponent,
				DurationPipe,
				CollapsibleWellComponent,
				UpvoteComponent
			],
			providers: [
				{ provide: AuthService, useValue: mockAuthService},
				{ provide: VoterService, useValue: mockVoterService}
			]
		});
		fixture = TestBed.createComponent(SessionListComponent);
		component = fixture.componentInstance;
		debugEl = fixture.debugElement;
		element = fixture.nativeElement;
	});

	describe('initial display', () => {
			it('should have the correct name', () => {
				component.sessions = [
					{name: 'Session 1', id: 3, presenter: 'Joe', duration: 1, level: 'beginner', abstract: 'abstract',
						voters: ['john', 'bob']}
				];
				component.filterBy = 'all';
				component.sortBy = 'name';
				component.eventId = 4;
				component.ngOnChanges();

				fixture.detectChanges();

				expect(element.querySelector('[well-title]')?.textContent).toContain('Session 1');
				expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1')
			})
	})
})