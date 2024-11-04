import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.geom.Ellipse2D;
import java.awt.geom.Path2D;
import java.awt.geom.Rectangle2D;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class DrawingPanel extends JPanel {

    public static void main(String[] args) {
        JFrame frame = new JFrame("Java 2D Graphics Demo");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(800, 600);
        frame.add(new DrawingPanel());
        frame.setVisible(true);
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        Graphics2D g2d = (Graphics2D) g;

        // Draw a rectangle
        Rectangle2D rect = new Rectangle2D.Double(100, 100, 200, 100);
        g2d.draw(rect);
        g2d.fill(rect);

        // Draw an oval
        Ellipse2D oval = new Ellipse2D.Double(400, 100, 200, 100);
        g2d.draw(oval);

        // Draw a polygon
        Path2D polygon = new Path2D.Double();
        polygon.moveTo(200, 300);
        polygon.lineTo(300, 400);
        polygon.lineTo(100, 400);
        polygon.closePath();
        g2d.draw(polygon);
    }
    
}