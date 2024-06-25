context('일기장 기본 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('일기장 앱이 잘 실행되는가?', () => {
    cy.title().should('eq', '나의 일기장')
  })

  it('월 변경 작동 확인', () => {
    // #A 노드의 초기 콘텐츠를 읽기
    cy.get('.titlebar').invoke('text').then(initialContent => {
      // #button 클릭
      cy.get('[data-test=prev]').click();

      // #A 노드의 콘텐츠가 변경되었는지 확인
      cy.get('.titlebar').should('not.have.text', initialContent);
    });
  })
})