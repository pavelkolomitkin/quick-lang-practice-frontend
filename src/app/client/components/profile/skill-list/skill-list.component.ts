import {Component, Input, OnInit, ViewChild} from '@angular/core';
import User from '../../../../core/data/model/user.model';

import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {LanguageSkill} from '../../../../core/data/model/language-skill.model';

@Component({
  selector: 'app-client-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {

  @Input() isEditable: boolean = false;

  @Input() user: User;

  modalRef: BsModalRef;

  @ViewChild('addSkillModalTemplate')
  addSkillModalTemplate: TemplateRef<any>;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {

  }

  onAddButtonClickHandler($event)
  {
    this.modalRef = this.modalService.show(this.addSkillModalTemplate);
  }

  onSkillCreateHandler(skill: LanguageSkill)
  {
    this.user.skills.push(skill);
  }

  onDeleteSkillHandler(skill: LanguageSkill)
  {
    const index = this.user.skills.findIndex((item) => {
      return (item.id === skill.id);
    });

    if (index !== -1)
    {
      this.user.skills.splice(index, 1);
    }
  }

}
