new (class ConnectFourGame{
    
    constructor() {
        this.gameContainer = document.getElementById('game-container')
        this.gamePopup = document.getElementById('game-end')
        this.row = 6
        this.col = 7
        this.grid = new Array(this.col)
        for (let y = 0; y < this.col; y++)
            this.grid[y] = new Array(this.row).fill(0)
        this.currentPlayer = 1
        this.setupBoard()
    }
    
    setupBoard()
    {
        for (let y = 0; y < this.col; y++)
        {
            let col = document.createElement('div')
            col.className = 'connect-four-col'
            for (let x = 0; x < this.row; x++)
            {
                let elem = document.createElement('div')
                elem.className = 'connect-four-case empty'
                elem.addEventListener('click', () => this.playMove(y))
                col.appendChild(elem)
            }
            this.gameContainer.appendChild(col)
        }
        document.getElementById('game-reset-button').addEventListener('click', () => this.resetGame())
    }

    playMove(col)
    {
        for (var x = 0; x < this.row && this.grid[col][x] != 0; x++);
        if (x === this.row) return
        this.grid[col][x] = this.currentPlayer
        this.gameContainer.children[col].children[x].classList.remove('empty');
        this.gameContainer.children[col].children[x].classList.add('case-' + (this.currentPlayer === 1 ? 'blue' : 'orange'));
        this.checkEndCondition()
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1
    }

    checkEndCondition()
    {
        // Check no more move
        let emptyCell = 0
        for (let y = 0; y < this.col; y++)
        {
            for (let x = 0; x < this.row; x++)
            {
                emptyCell = this.grid[y][x] === 0 ? emptyCell + 1 : 0
            }
        }
        if (emptyCell === 0)
            return this.onDraw();

        // Check vertical
        let consecutive = 0
        for (let y = 0; y < this.col; y++)
        {
            for (let x = 0; x < this.row; x++)
            {
                consecutive = this.grid[y][x] === this.currentPlayer ? consecutive + 1 : 0
                if (consecutive === 4) return this.onWin()
            }
        }

        // Check horizontal
        consecutive = 0
        for (let x = 0; x < this.row; x++)
        {
            for (let y = 0; y < this.col; y++)
            {
                consecutive = this.grid[y][x] == this.currentPlayer ? consecutive + 1 : 0
                if (consecutive === 4) return this.onWin()
            }
        }

        // Check diagonal
        consecutive = 0
        for (let y = 0; y < this.col - 3; y++)
        {
            for (let x = 0; x < this.row - 3; x++)
            {
                for (let i = 0; i < 4; i++)
                    consecutive = this.grid[y + i][x + i] == this.currentPlayer ? consecutive + 1 : 0
                if (consecutive === 4) return this.onWin()
            }
        }

        // Check other diagonal
        consecutive = 0
        for (let y = this.col - 1; y > 3; y--)
        {
            for (let x = 0; x < this.row - 3; x++)
            {
                for (let i = 0; i < 4; i++)
                    consecutive = this.grid[y - i][x + i] == this.currentPlayer ? consecutive + 1 : 0
                if (consecutive === 4) return this.onWin()
            }
        }
        return
    }

    onWin()
    {
        this.gamePopup.classList.add('visible')
        document.getElementById('game-end-message').textContent = `Player ${this.currentPlayer === 1 ? 'One' : 'Two'} win !`
    }

    onDraw()
    {
        this.gamePopup.classList.add('visible')
        document.getElementById('game-end-message').textContent = `Draw !`
    }

    resetGame()
    {
        this.gamePopup.classList.remove('visible')
        for (let y = 0; y < this.col; y++)
        {
            for (let x = 0; x < this.row; x++)
            {
                this.grid[y][x] = 0
                this.gameContainer.children[y].children[x].className = 'connect-four-case empty'
            }
        }
        
    }
})()