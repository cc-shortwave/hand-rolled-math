import pygame
import math

def generate_primes(n_primes):
    primes = []
    candidate = 2
    while len(primes) < n_primes:
        is_prime = True
        for p in primes:
            if p * p > candidate:
                break
            if candidate % p == 0:
                is_prime = False
                break
        if is_prime:
            primes.append(candidate)
        candidate += 1
    return primes

def primes_in_range(upper_bound):
    primes = []
    for num in range(2, int(upper_bound)+1):
        is_p = True
        for d in range(2, int(math.isqrt(num)) + 1):
            if num % d == 0:
                is_p = False
                break
        if is_p:
            primes.append(num)
    return primes

def compute_original(x, primes):
    res = 1.0
    for p in primes:
        s = math.sin(math.pi * x / p)
        res *= s
        if abs(res) < 1e-14:
            break
    return res

def estimate_max_abs(x_max, primes, sample_cnt=200):
    """采样估算区间内函数最大绝对值，用于自适应缩放"""
    maxa = 0.0
    for i in range(sample_cnt):
        x = (i / (sample_cnt-1)) * x_max
        v = compute_original(x, primes)
        av = abs(v)
        if av > maxa:
            maxa = av
    if maxa < 1e-12:
        maxa = 1.0
    return maxa


class Slider:
    def __init__(self, x, y, width, height, min_val, max_val, init_val):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.min_val = min_val
        self.max_val = max_val
        self.value = init_val
        self.handle_radius = 8
        self.dragging = False

    def draw(self, screen):
        pygame.draw.rect(screen, (70,70,70), (self.x, self.y, self.width, self.height))
        ratio = (self.value - self.min_val) / (self.max_val - self.min_val)
        handle_x = int(self.x + ratio * self.width)
        pygame.draw.circle(screen, (0,170,255), (handle_x, self.y + self.height//2), self.handle_radius)

    def handle_event(self, event):
        if event.type == pygame.MOUSEBUTTONDOWN:
            mx, my = event.pos
            ratio = (self.value - self.min_val)/(self.max_val - self.min_val)
            hx = int(self.x + ratio*self.width)
            if abs(mx - hx) <= self.handle_radius + 6 and abs(my - (self.y+self.height//2)) <= self.handle_radius+6:
                self.dragging = True
        if event.type == pygame.MOUSEBUTTONUP:
            self.dragging = False
        if event.type == pygame.MOUSEMOTION and self.dragging:
            mx, _ = event.pos
            t = max(0.0, min(1.0, (mx - self.x)/self.width))
            self.value = self.min_val + t * (self.max_val - self.min_val)

pygame.init()
W, H = 1280, 840
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("PRODUCT ∏ sin(πx/p) | Auto‑scale")
clock = pygame.time.Clock()
font = pygame.font.Font(None, 22)

slider_primecnt = Slider(20, 20, 240, 12, 1.0, 45.0, 10.0)
slider_xrange = Slider(20, 60, 240, 12, 4.0, 140.0, 70.0)
slider_yscale = Slider(20, 100, 240, 12, 20.0, 300.0, 120.0)

running = True
last_n = -1
last_xmax = -1
product_primes = []
all_primes_view = []
current_max_abs = 1.0

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        slider_primecnt.handle_event(event)
        slider_xrange.handle_event(event)
        slider_yscale.handle_event(event)

    n_primes = int(slider_primecnt.value)
    x_max = slider_xrange.value
    y_scale = slider_yscale.value

    # 素数或横轴改变时，重新估算最大幅值
    if n_primes != last_n or abs(x_max - last_xmax) > 0.5:
        product_primes = generate_primes(n_primes)
        last_n = n_primes
        all_primes_view = primes_in_range(x_max)
        last_xmax = x_max
        current_max_abs = estimate_max_abs(x_max, product_primes, sample_cnt=220)

    screen.fill((0,0,0))
    slider_primecnt.draw(screen)
    slider_xrange.draw(screen)
    slider_yscale.draw(screen)

    t1 = font.render(f"Prime count: {n_primes}", True, (255,255,255))
    t2 = font.render(f"X‑axis range: {x_max:.1f}", True, (255,255,255))
    t3 = font.render(f"Y‑gain: {y_scale:.1f}  autoMaxAbs:{current_max_abs:.3e}", True, (255,255,255))
    t5 = font.render("Orange: primes used | Red: primes in view unused", True, (160,160,160))
    screen.blit(t1, (270,14))
    screen.blit(t2, (270,54))
    screen.blit(t3, (270,94))
    screen.blit(t5, (20,130))

    ox = 340
    oy = H//2
    graph_width = W - ox - 25
    graph_top = 20
    graph_bottom = H - 20

    pygame.draw.line(screen, (80,80,80), (ox, graph_top), (ox, graph_bottom), 2)
    pygame.draw.line(screen, (80,80,80), (ox, oy), (W-20, oy), 2)

    curve_points = []
    for px in range(ox, W-20):
        frac = (px - ox)/graph_width
        x_val = frac * x_max
        y_val = compute_original(x_val, product_primes)
        # 自适应归一化
        scaled_y = (y_val / current_max_abs) * y_scale
        py = oy - scaled_y
        py = max(graph_top, min(graph_bottom, py))
        curve_points.append((px, py))

    if len(curve_points)>=2:
        pygame.draw.lines(screen, (0, 235, 255), False, curve_points, 2)

    for p in all_primes_view:
        px_mark = ox + int(p / x_max * graph_width)
        color = (255,140,30) if p in product_primes else (220,40,40)
        pygame.draw.line(screen, color,(px_mark, oy-10),(px_mark, oy+10),2)
        label = font.render(str(p), True, color)
        screen.blit(label, (px_mark+3, oy+12))

    tick_step = max(5, int(x_max//10))
    for tick in range(0, int(x_max)+1, tick_step):
        px_tick = ox + int(tick / x_max * graph_width)
        pygame.draw.line(screen,(110,110,110),(px_tick, oy-5),(px_tick, oy+5),1)
        txt = font.render(str(tick), True, (190,190,190))
        screen.blit(txt, (px_tick-8, oy+14))

    pygame.display.flip()
    clock.tick(30)

pygame.quit()