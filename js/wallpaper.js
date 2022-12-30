function audioListener(audioArray)
{
    for (i = 0; i < 64; i++)
    {
        val = audioArray[i] * 100;
        visualizer.parts.left[i].css("height", val + "%");
    }
    for (i = 0; i < 64; i++)
    {
        val = audioArray[i + 64] * 100;
        visualizer.parts.right[i].css("height", val + "%");
    }
}

function pageLoaded()
{
    visualizer.visualizer = $("#visualizer");
    for (i = 0; i < 64; i++)
    {
        visPartRoot = $("<div id=\"vis-root-" + i + "\" class=\"visualizer-part-root\"></div>");
        visPart = $("<div id=\"vis-l-"+i+"\" class=\"visualizer-part left\"></div>");
        visPartRoot.append(visPart)
        visualizer.parts.left.push(visPart);
        visPart = $("<div id=\"vis-r-"+i+"\" class=\"visualizer-part right\"></div>");
        visPartRoot.append(visPart)
        visualizer.parts.right.push(visPart);
        visualizer.visualizer.append(visPartRoot);
    }
}

var visualizer = {};
visualizer.parts = {};
visualizer.parts.left = [];
visualizer.parts.right = [];

useCustBg = false;

$().ready(pageLoaded);
window.wallpaperRegisterAudioListener(audioListener);
window.wallpaperPropertyListener = {
    applyUserProperties: function (properties)
    {
        if (properties.leftchannelcolor)
        {
            for (i = 0; i < 64; i++)
            {
                colors = properties.leftchannelcolor.value.split(' ');
                rgb = "rgb(" + (colors[0] * 255) + "," + (colors[1] * 255) + "," + (colors[2] * 255) + ")"; 
                visualizer.parts.left[i].css("background-color", rgb);
            }
        }
        if (properties.rightchannelcolor)
        {
            for (i = 0; i < 64; i++)
            {
                colors = properties.rightchannelcolor.value.split(' ');
                rgb = "rgb(" + (colors[0] * 255) + "," + (colors[1] * 255) + "," + (colors[2] * 255) + ")"; 
                visualizer.parts.right[i].css("background-color", rgb);
            }
        }

        if (properties.backgroundimage)
        {
            $("body").css("background-image", "url(\"file:///" + properties.backgroundimage.value + "\")");
        }
        if (properties.backgroundimagesize)
        {
            if (properties.backgroundimagesize.value != "manual")
            {
                $("body").css("background-position", properties.backgroundimagesize.value);
                $("body").css("background-size", properties.backgroundimagesize.value);
            }
        }

        if (properties.usecustombackground)
        {
            if (properties.usecustombackground.value == true)
            {
                $("body").css("background-image", "url(\"file:///" + properties.backgroundimage.value + "\")");
            }
            else 
            {
                $("body").css("background-image", "");
                $("body").css("background-position", "");
                $("body").css("background-size", "");
            }
        }
    }
}