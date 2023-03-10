# Тестовое задание

## 1. 
  - Какие вы бы использовали библиотеки?
  - Какие решения вы бы использовали для реализации?
  - Какие вы видите сложности в реализации?
  
    ### Решение:
    - Какие вы бы использовали библиотеки?

    
        - ___React___ /Vue   
          Любая UI библиотека/фреймворк для построения UI 
        
        - ___Next.js___/ любая ss(r/g) библиотека  
          Приложение большое, много динамических данных, использовать CSR/SPA - не лучший вариант  
        
        - ___Mobx/Zustand___/Redux/Recoil  
          
        
        - ___emotion___/styled-components  
          Любая CSS-IN-JS библиотека для стилизации приложения  
        
        - __Material UI__  
          ___необязательно___, любая UI библиотека/фреймворк для использования готовых компонентов, но я бы написал их сам  
        
        - __axios__  
          Для запросов  
        
        - __TypeScript__  
          Проект большой, поэтому JS не лучший вариант  
        
        - __react-(google/facebook/apple)-login__  
          Логинизация с помощью иных систем  
          
        - Jest/Enzyme  
          

     - Какие решения вы бы использовали для реализации?  
        
        - __UI библиотека/фреймворк для быстрого прототипирования - не имеет смысла__  
            С точки зрения UX, почти всё приложения, кроме раздел "игры" в About us - попадает под прототипирование, однако на каждой странцие есть svg которые распологается  
            вне блока, поэтому наилучший вариант - это реализовать всю grid сетку самому 

        - __Цветовая палитра приложения - неизмена.__  
            В приложении нет возможности переключить ее тему, поэтому цвета будут статические, при этом стоит учитывать что должен быть единственный источник данных, т.е           или экспортируемая переменная или хук для получения контекста.  
          
                В данном случае, если мы используем реализацию контекста для цвета, то  
                нужно использовать встроенный контекст эко-системы библиотеки/фреймворка, чтобы абстрагироваться  
                от реализации derived значений state-manage'ров  
            
        - __Весь текст в приложении - имеет четкую иерархию.__  
            На каждой странице есть h1 заголовок, подзаголовки, заголовки, обычный текст,  
            с точки зрения реализации - нужно использовать общий компонент (<Typography /> например),  
            чтобы обеспечить единую формулу для flexbile/responsible текста.  
            
            > Наиболее лучший паттерн проектирования для этого компонента это dot notation.  

        - __Для приложения лучше использовать SSR, в этом случае можно использовать Next.js__  
            Приложения большое и подгружает много динамических данных и они есть на каждой странице, для этого надо использовать SSR, чтобы все данные для конкетной   страницы загружались однажды. Для этого можно использовать Next.js, вызываем getServerSideProps и получаем данные, во время получения - отправляем на клиента html и   показываем loader вместо подгружаемого контента  

        - __В приложении есть перевод__  
            Для хранения переводов - лучше использовать CMS, в приложении нужно использовать i18n + перевод слов из CMS, и все приложения обернуть в контекст для переключения языка.  

        - __В приложении много pop-up/modal-window окон__  
            Реализацию pop-up компонента стоит организовывать с одним z-index и в дальнейшем - не использовать z-index вне вызова компонента (<PopUp />, например)  
            Использование z-index с одинаковым контентом обеспечит ожидаемое поведение путем наложения контекста  

            > Примерная реализация __https://github.com/kusainovv/core.kus/blob/main/core/components/Popup.tsx__  

        - __Формы на странице не много и они не сложные - поэтому реализацию стоит взять на свой stateful компонент__  
            
        - __State manager обязательно нужен, в приложении много действий и derivations значений__  

        - __Таблица в Supported networks имеет простую фильтрующую логику в сложности O(n2)__  
            Хоть и таблица имеет примитивную логику работы, но операция - очень дорогая с точки зрения perfomance, поэтому нужно ее оптимизировать:    
                - использовать мемоизированный callback вместо оригинальной ссылки на компонент  
                - использовать lazy loading для ячеек таблицы  
                - импортировать компонент "лениво"  
                - использовать useCallback для избежания лишних созданий уже имеющихся функций  
                - ячейка в таблице может удаляться, во время удаления нужно выдать новый отфильтрованный список ячеек, для фильтрации можно использовать любой  
                  алгоритм фильтрации (например, Хоара)  

        - __В разделе Questions есть accordion компонент и он должен быть абстрагирован__  
            Лексическое окружение в accordion компонент (isClosed и т.д) должен быть доступен только в accordion компонент, однако в случае когда нужно сделать так чтобы  
            два независимых accordion'а влияли друг на друга, то нужно зарегистрировать id accordionа их в хуке  

        - __Все компоненты нужно декомпозировать используя SPR (принцип единной отвественности)__  
            Дальнейшие рекомендации используются для компонентов разделенных SPR  
            
            - __В приложении всего 2 вида кнопок__  
                Для каждого вида кнопок должен быть свой прототип, т.е dot-notation должен  
                наследовать от общего компонента Button, где Button имеет props: text и extra,  
                где extra - является опциональными props'ами.  
              
            - __Маскот в About Us должен быть абстрагирован__  
                Его кординаты и rotate свойства должны прилетать как props'ы  

            - __Формы должны быть настраиваемые__  
                Количество инпутов, правила валидации, надстройки над инпутами должны быть переданные через props'ы  

            - __Карточки с hover svg анимацией (хоть она и одна) и карточки без - две разные сущности__


     - Какие вы видите сложности в реализации?
        __Никакие__
      
## 2
  - Как бы вы реализовали возможность изменять контент через конструктор? Планируется, чтобы менеджер мог напрямую

    - менять текст
    - добавлять в раздел списка поддерживаемых сетей новую сеть
    - добавлять новые публикаций в раздел блог.


      - __Лучшая идея для этого написать обычную CMS__  
        Т.е использовать UI библиотеку/фреймворк (например, Material-UI) создать обычную Grid сетку и подвязать её к апи - добавить страницы которые отвечают за текст, за список  
        поддерживаемых сетей , новые публикации в разделе блог и т.д  
        потом когда изменяются данные в CMS - то просто слать запросы на определенный endpoint.
      - __Использовать динамические данные для контента__  
        Динамические данные получаем через обычные http запросы на endpoint от CMS  
      - __Другие CMS решения (например, Wordpress)__  
        Если поднять свою CMS - не самое лучшее бизнес решение, то можно использовать уже готовые CMS'ки.  

## 3
  - Как бы вы реализовали и решили вопрос с хорошей индексацией сайта поисковиками?  
    Я писал статью про это - https://kusainovv.medium.com/how-semantic-tags-affect-seo-89c7b1992440  
    - __Добавить мета теги в head__  
          Теги title и description оказывают положительное влияние на SEO (учитывая правило длины контента)  
    - __Использовать изображения в HTML где это возможно__  
          Т.к изображения в CSS не индексируются
    - __Использовать picture тег и использовать все аттрибут в picture/img тег__  
    - __Использовать JSON-LD__  
    - __Написать robots.txt__  
    - __Добавить механизм подписки (link тег)__  
    - __Добавить favicon__  
    - __Использовать только один h1 тег__
    - __Использовать aria-* аттрибуты__
    - __Использовать lang аттрибуты__
    - __В целом оптимизировать приложение__  
          Повышенная оптимизация приложения увеличивает FCP и другие Lighthouse параметры
  
  - Какие вы видите проблемы с индексацией?

    - __Большинство картинок будут вставлены через CSS__  
    - __Если мы будем использовать lazy loading для ячеек в таблице Supported networks - то изображения в ячейке вне поле зрения будет не проиндексировано.__  
    - __Медиаданные в Accordion компоненте могут быть не проиндексированны__  

## 4
  - Какие сроки вы бы обозначили на разработку этого сайта?

    - __полторы - две недели__
    - (однако если проект горит, то неделя)
    
    
    
    
# *Реализация Keplr

Результат(залил на хост) - https://explain-9ayw.vercel.app  
Код - https://github.com/kusainovv/explain/tree/main/app  
