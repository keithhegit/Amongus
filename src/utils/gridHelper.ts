export class GridHelper {
  static generateGrid(columns: number, rows: number): string[] {
    const grid: string[] = [];
    const columnLetters = Array.from({ length: columns }, (_, i) => 
      String.fromCharCode(65 + i)
    );
    
    for (let row = 1; row <= rows; row++) {
      for (const col of columnLetters) {
        grid.push(`${col}${row}`);
      }
    }
    
    return grid;
  }

  static isValidPosition(position: string, maxColumns: number, maxRows: number): boolean {
    const col = position.charAt(0);
    const row = parseInt(position.slice(1));
    
    return (
      col >= 'A' && 
      col <= String.fromCharCode(64 + maxColumns) &&
      row >= 1 && 
      row <= maxRows
    );
  }

  static getAdjacentPositions(position: string, maxColumns: number, maxRows: number): string[] {
    const col = position.charAt(0);
    const row = parseInt(position.slice(1));
    const colNum = col.charCodeAt(0) - 65;
    
    const adjacent: string[] = [];
    const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1] // left, right, up, down
    ];
    
    for (const [dx, dy] of directions) {
      const newCol = String.fromCharCode(65 + colNum + dx);
      const newRow = row + dy;
      const newPos = `${newCol}${newRow}`;
      
      if (this.isValidPosition(newPos, maxColumns, maxRows)) {
        adjacent.push(newPos);
      }
    }
    
    return adjacent;
  }
}