import * as ko from "knockout";

const TRAPEZOIDAL_FINS:number = 0;


/**
 * Rocket Model Rendering Module
 */
class RocketRendererClass
{
  private model: IRocketModel; // Data of the rocket model

  private cnv: HTMLCanvasElement; // Canvas element
  private ctx: CanvasRenderingContext2D; // Canvas 2D Context

  // Coordinates
  private  startPos: ICoordinates;  // Top/Edge of the rocket body
  private    endPos: ICoordinates;  // Bottom/Edge of the rocket body
  private   currPos: ICoordinates; // Current position on the canvas at any time
  private middlePos: ICoordinates; // Middle of the rocket body

  private static drawTimeout: number;

  private animating: boolean;

  // Constructor
  constructor()
  {
    // Default Values
    this.startPos  = { x: 80, y: 100 };
    this.endPos    = { x: 0, y: 0 };
    this.currPos   = { x: 0, y: 0 };
    this.middlePos = { x: 0, y: 0 };


    this.cnv = (document.getElementById('displayCanvas') as HTMLCanvasElement);
    this.ctx = this.cnv.getContext('2d'); // Get the canvas context

    // Initialize the canvas
    this.ctx.strokeStyle = '#FFFFFF';
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.lineWidth = 1;
    this.ctx.font = '14px Consolas';

    this.animating = false;
  } // End constructor


  /* =====================
   *    Public Functions
   * ===================== */

  /**
   * Apply a model to the renderer
   */
  public setModel(theModel: IRocketModel): void
  {
    this.model = theModel;
  } // End setModel

  /**
   * Schedule a render
   */
  public scheduleRender(): void
  {
    clearTimeout(RocketRendererClass.drawTimeout); // Clear the timeout (prevents repeated rendering)

    if (this.ctx instanceof CanvasRenderingContext2D)
    {
      // Schedule a new drawing
        RocketRendererClass.drawTimeout = setTimeout(() => {
            requestAnimationFrame(() => {
                this.draw();
            });
      }, 250);
    }
  } // End scheduleRender


  /* =====================
   *  Private Functions
   * ===================== */

  /**
   * Convert to pixels
   */
  private toPx(dimension: number): number
  {
    return dimension * 5;
  } // End toPx

  /**
   * Move Positions on the canvas
   */
  private move (x: number, y: number): void
  {
    this.ctx.moveTo(x, y);

    // Update current position
    this.currPos.x = x;
    this.currPos.y = y;

  } // End move

  /**
   * Draw a line on the canvas
   */
  private line (x: number, y: number): void
  {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.move(x, y); // Move to the location at the other end of the line

  } // End line

  /**
   * Draw the Rocket
   */
  private draw(): void
  {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);
    this.ctx.beginPath();

    // Move to starting position
    this.move(this.startPos.x, this.startPos.y);

    // Draw all of the modules
    this.drawBody();
    this.drawNosecone();
    this.drawFins();
    this.drawMotorMount();

    this.drawDimensions();

  } // End Draw


  /**
   * Draw the rocket body
   */
  private drawBody(): void
  {
    // Calculate end position
    this.endPos.x = this.startPos.x + this.toPx(this.model.body.length);
    this.endPos.y = this.startPos.y + this.toPx(this.model.body.diameter);

    // Calculate middle position
    this.middlePos.x = (this.startPos.x + this.endPos.x) / 2;
    this.middlePos.y = (this.startPos.y + this.endPos.y) / 2;

    // Draw
    this.line(this.endPos.x, this.startPos.y); // Top of body tube
    this.move(this.endPos.x, this.endPos.y);
    this.line(this.startPos.x, this.endPos.y); // Bottom
    this.line(this.startPos.x, this.startPos.y); // Left end

  } // End drawBody


  /**
   * Draw the nosecone
   */
  private drawNosecone(): void
  {
    this.move(this.endPos.x, this.startPos.y);

    // Draw
    this.line(this.endPos.x + this.toPx(this.model.nosecone.length),
              this.middlePos.y);
    this.line(this.endPos.x, this.endPos.y);

  } // End drawNosecone


  /**
   * Draw the fins
   */
  private drawFins(): void
  {
    let finHeight: number = 25; // 25px fin height
    let finWidth: number  = 120; // 120px fin width
    let fin4th: number    = finWidth / 4;
    let finHalf: number   = finWidth / 2;

    let offset: number = this.toPx(this.model.fins.offset);

    this.move(this.startPos.x + offset, this.startPos.y);

    // Draw each fin type
    switch (this.model.fins.style)
    {
      // Trapezoidal
      case 0:
        // Top Fin
        this.line(this.currPos.x + fin4th, this.currPos.y - finHeight); // Trailing edge
        this.line(this.currPos.x + fin4th, this.currPos.y); // Outside edge
        this.line(this.currPos.x + fin4th, this.startPos.y); // Leading edge

        // Bottom Fin
        this.move(this.startPos.x + offset, this.endPos.y);
        this.line(this.currPos.x + fin4th, this.currPos.y + finHeight);   // Trailing
        this.line(this.currPos.x + fin4th, this.currPos.y);               // Outside
        this.line(this.currPos.x + fin4th, this.endPos.y);                // Leading
        break;

      // Clipped Delta
      case 1:
        // Top Fin
        this.line(this.currPos.x, this.currPos.y - finHeight); // Trailing edge
        this.line(this.currPos.x + fin4th, this.currPos.y);    // Outside edge
        this.line(this.currPos.x + finHalf, this.startPos.y);  // Leading edge

        // Bottom Fin
        this.move(this.startPos.x + offset, this.endPos.y);
        this.line(this.currPos.x, this.currPos.y + finHeight);  // Trailing
        this.line(this.currPos.x + fin4th, this.currPos.y);     // Outside
        this.line(this.currPos.x + finHalf, this.endPos.y);     // Leading
        break;

      // Tappered Swept
      default:
        // Top Fin
        this.move(this.startPos.x + offset + 20, this.startPos.y);
        this.line(this.currPos.x - fin4th, this.currPos.y - finHeight); // Trailing edge
        this.line(this.currPos.x + fin4th, this.currPos.y); // Outside edge
        this.line(this.currPos.x + finHalf + fin4th, this.startPos.y); // Leading edge

        // Bottom Fin
        this.move(this.startPos.x + offset + 20, this.endPos.y);
        this.line(this.currPos.x - fin4th, this.currPos.y + finHeight); // Trailing edge
        this.line(this.currPos.x + fin4th, this.currPos.y); // Outside edge
        this.line(this.currPos.x + finHalf + fin4th, this.endPos.y);

    } // End switch


    // Clone the rocket for the motor mount view
    let cutOutData: ImageData = this.ctx.getImageData(this.startPos.x, this.startPos.y - finHeight, this.cnv.width, this.endPos.y + finHeight);
    this.ctx.putImageData(cutOutData, this.startPos.x, this.endPos.y + 60);


    // Draw sidefin for everything but tappered swept
    if (this.model.fins.style !== 2)
    {
      this.move(this.startPos.x + offset, this.middlePos.y - 4);
      this.line(this.currPos.x, this.middlePos.y + 4); // Trailing edge
      this.line(this.currPos.x + finWidth - 20, this.currPos.y); // Bottom
      this.line(this.currPos.x, this.middlePos.y - 4); // Leading edge
      this.line(this.startPos.x + offset, this.currPos.y); // Top
    }else{
      // Tappered Swept side fin
      this.move(this.startPos.x + offset - 5 + finWidth, this.middlePos.y - 4);
      this.line(this.startPos.x + offset - 5, this.currPos.y); // Top
      this.line(this.currPos.x, this.middlePos.y + 4); // Trailing edge
      this.line(this.startPos.x + offset - 5 + finWidth, this.currPos.y); // Bottom
      this.line(this.currPos.x, this.middlePos.y - 4); // Leading edge
    }

  } // End drawFins


  /**
   * Draw the Motor Mount
   */
  private drawMotorMount(): void
  {
    let sizePx: number = this.toPx(this.model.motorMount.diameter / 25.4); // Convert from mm to inches
    let leftOver: number = (this.model.body.diameter - (this.model.motorMount.diameter / 25.4)) / 2; // Leftover space between motormount and body tube

    // The next two variables add 85px to the y coordinate, this is because the fins
    // have a 25px height, and the remaining 60px is the gap between the top and
    // bottom renderings
    let startY: number = this.endPos.y + 85 + this.toPx(leftOver);
    let endY: number = this.endPos.y + 85 + this.toPx(this.model.body.diameter);


    // Draw on the cut out image
    this.move(this.startPos.x - 10, startY);
    this.line(this.currPos.x + this.toPx(this.model.motorMount.length),
            this.currPos.y); // Top
    this.line(this.currPos.x, endY - this.toPx(leftOver)); // Right
    this.line(this.startPos.x - 10, this.currPos.y); // Bottom
    this.line(this.currPos.x, startY); // Left

    // Draw on main rocket
    this.move(this.startPos.x, this.startPos.y + this.toPx(leftOver));
    this.line(this.currPos.x - 10, this.currPos.y); // Top
    this.line(this.currPos.x, this.endPos.y - this.toPx(leftOver)); // Left
    this.line(this.currPos.x + 10, this.currPos.y); // Bottom

  } // End drawMotorMount


  /**
   * Draw the dimension lines on the screen
   */
  private drawDimensions(): void
  {
    let txt:string; // Text for current measurement
    let size:any; // Size of measured txt

    let fullLength:number = parseFloat(this.model.body.length + '') + parseFloat(this.model.nosecone.length + '');

    // Length
    this.move(this.startPos.x, this.endPos.y + 30);
    this.line(this.currPos.x, this.currPos.y + 20); // Left arrow head
    this.move(this.startPos.x, this.currPos.y - 10);
    this.line(this.endPos.x + this.toPx(this.model.nosecone.length), this.currPos.y); // Length line
    this.move(this.currPos.x, this.endPos.y + 30);
    this.line(this.currPos.x, this.currPos.y + 20); // Right arrow head

    txt = fullLength.toFixed(2) + '"';
    size = this.ctx.measureText(txt);
    this.ctx.fillText(txt, this.startPos.x + this.toPx(fullLength / 2) - (size.width/2),
                      this.currPos.y + 10);

    // Diameter
    this.move(this.startPos.x - 10, this.startPos.y);
    this.line(this.currPos.x - 20, this.startPos.y); // Top arrow head
    this.move(this.currPos.x + 10, this.startPos.y);
    this.line(this.currPos.x, this.endPos.y); // Dimension line
    this.move(this.currPos.x + 10, this.currPos.y);
    this.line(this.currPos.x - 20, this.currPos.y); // Bottom arrow head

    txt = parseFloat(this.model.body.diameter + '').toFixed(2) + '"';
    this.ctx.fillText(txt, this.startPos.x - 60, this.middlePos.y + 5);

    // Motor Mount Length
    this.move(this.startPos.x - 10, this.endPos.y + 85 + this.toPx(this.model.body.diameter) + 10);
    this.line(this.currPos.x, this.currPos.y + 40); // Left arrow head
    this.move(this.currPos.x + this.toPx(this.model.motorMount.length), this.currPos.y);
    this.line(this.currPos.x, this.currPos.y - 40);
    this.move(this.currPos.x, this.currPos.y + 30);
    this.line(this.startPos.x - 10, this.currPos.y);

    txt = parseFloat(this.model.motorMount.length+'').toFixed(2) + '"';
    size = this.ctx.measureText(txt);
    this.ctx.fillText(txt, this.currPos.x + this.toPx(this.model.motorMount.length / 2) - (size.width/2),
                      this.currPos.y + 20);


  } // End drawDimensions

} // End RocketRenderer


export let RocketRenderer = new RocketRendererClass();
