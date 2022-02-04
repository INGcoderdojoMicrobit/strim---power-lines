namespace SpriteKind {
    export const powerline = SpriteKind.create()
    export const Lines = SpriteKind.create()
    export const TotallyANormalSprite = SpriteKind.create()
    export const Overlapper = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.powerline, function (sprite, otherSprite) {
    game.over(false)
})
function make_a_power_line_sprite (height: number) {
    power_line_top = img`
        . . . . . . . f f . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . f f f f f f f f f f f f . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . f . . . f f . . . f . . . 
        f f f f f f f f f f f f f f f f 
        . . . f . . . f f . . . f . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . f f . . . . . . . 
        `
    powerline = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.powerline)
    powerline_image = image.create(15, height)
    for (let index = 0; index <= height - 16; index++) {
        powerline_image.setPixel(7, index + 16, 15)
        powerline_image.setPixel(8, index + 16, 15)
    }
    spriteutils.drawTransparentImage(power_line_top, powerline_image, 0, 0)
    powerline.setImage(powerline_image)
    return powerline
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    isJumping = true
    main_character.vy = -180
    main_character.ay = 500
    animation.stopAnimation(animation.AnimationTypes.All, main_character)
})
sprites.onDestroyed(SpriteKind.powerline, function (sprite) {
    info.changeScoreBy(1)
    old_powerline = power_line
    temp_x = power_line.x
    power_line = make_a_power_line_sprite(randint(50, 80))
    power_line.x = temp_x + distance_between_power_lines
    power_line.bottom = 120
    the_lines = make_power_line_LINE_sprite(old_powerline, power_line)
    the_lines.left = old_powerline.x
    the_lines.top = Math.min(old_powerline.top, power_line.top) + 3
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Lines, function (sprite, otherSprite) {
    if (isJumping) {
        animation.runImageAnimation(
        main_character,
        [img`
            . . . . f f 
            . . . . f f 
            . . . f f . 
            . . f f f . 
            . f f f . . 
            f . . f . . 
            `,img`
            . . . . f f 
            . . . . f f 
            . . . f f . 
            . . f f f . 
            . f f f . . 
            . f . . . . 
            `],
        100,
        true
        )
    }
    main_character.ay = 0
    isJumping = false
})
sprites.onOverlap(SpriteKind.Overlapper, SpriteKind.Lines, function (sprite, otherSprite) {
    if (!(isJumping)) {
        for (let index = 0; index <= otherSprite.height - 1; index++) {
            if (otherSprite.image.getPixel(sprite.x - otherSprite.left, index) == 15) {
                main_character.bottom = otherSprite.top + (index + 0)
            }
        }
    }
})
function make_power_line_LINE_sprite (left_powerline: Sprite, right_power_line: Sprite) {
    line_sprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Lines)
    line_image = image.create(right_power_line.x - left_powerline.x, Math.abs(right_power_line.height - left_powerline.height) + 1)
    console.log(right_power_line.x - left_powerline.x)
    if (0 < right_power_line.height - left_powerline.height) {
        line_image.drawLine(0, right_power_line.height - left_powerline.height, right_power_line.x - left_powerline.x, 0, 15)
    } else {
        line_image.drawLine(0, 0, right_power_line.x - left_powerline.x, left_powerline.height - right_power_line.height, 15)
    }
    line_sprite.setImage(line_image)
    return line_sprite
}
let line_image: Image = null
let line_sprite: Sprite = null
let temp_x = 0
let old_powerline: Sprite = null
let isJumping = false
let powerline_image: Image = null
let powerline: Sprite = null
let power_line_top: Image = null
let main_character: Sprite = null
let the_lines: Sprite = null
let power_line: Sprite = null
let distance_between_power_lines = 0
scene.setBackgroundColor(4)
let pause_time = 20
distance_between_power_lines = 80
for (let index = 0; index <= Math.floor(160 / distance_between_power_lines) + 2; index++) {
    power_line = make_a_power_line_sprite(randint(50, 80))
    power_line.x = index * distance_between_power_lines
    power_line.bottom = 120
}
for (let index = 0; index <= sprites.allOfKind(SpriteKind.powerline).length - 2; index++) {
    the_lines = make_power_line_LINE_sprite(sprites.allOfKind(SpriteKind.powerline)[index], sprites.allOfKind(SpriteKind.powerline)[index + 1])
    the_lines.left = sprites.allOfKind(SpriteKind.powerline)[index].x
    the_lines.top = Math.min(sprites.allOfKind(SpriteKind.powerline)[index].top, sprites.allOfKind(SpriteKind.powerline)[index + 1].top) + 3
}
main_character = sprites.create(img`
    . . . f f . 
    . . . f f . 
    . . f f . . 
    . f f f . . 
    . f f . . . 
    f . . f . . 
    `, SpriteKind.Player)
main_character.x = 40
animation.runImageAnimation(
main_character,
[img`
    . . . . f f 
    . . . . f f 
    . . . f f . 
    . . f f f . 
    . f f f . . 
    f . . f . . 
    `,img`
    . . . . f f 
    . . . . f f 
    . . . f f . 
    . . f f f . 
    . f f f . . 
    . f . . . . 
    `],
50,
true
)
let overlaps_sprite_shhh = sprites.create(img`
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    3 
    `, SpriteKind.Overlapper)
overlaps_sprite_shhh.x = 40
overlaps_sprite_shhh.setFlag(SpriteFlag.Invisible, true)
forever(function () {
    for (let value of sprites.allOfKind(SpriteKind.powerline)) {
        value.x += -1
        if (value.right < 0) {
            value.destroy()
        }
    }
    for (let value of sprites.allOfKind(SpriteKind.Lines)) {
        value.x += -1
        if (value.right < 0) {
            value.destroy()
        }
    }
    if (Math.percentChance(10)) {
        pause_time = Math.max(2, pause_time - 1)
    }
    pause(pause_time)
})
