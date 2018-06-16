import { NamedTemplateDirective } from './ngx-named-template.directive';

describe('NamedTemplateDirective', () => {
  it('should create an instance', () => {
    const directive = new NamedTemplateDirective('test name', null);
    expect(directive).toBeTruthy();
  });
});
