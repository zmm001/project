�}�� r �!  ��¿&�Љ��a	���ӟ���}�u�WW'�`{�rt(=1aQ_��;��I,��tى�_����+"NF�mW;P�
��緁��Hwx����+�pŭ@\Z,�*r��1�Y7-|!��]�v-�n$���=���DqQe�˴_�8��QW���lĻ^%pR�x����5��G�9��/�}��t�|"{�/{����1P�&�=G�t�d�q6��K�?����@>������������j��{��Q���a�R���3�~��*�vw�� ���r	��� ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD*|`��@D'x�Z���b�ot� �+�q�ި*��I*��1�87�IRS9��Q��\zqY;)p����G��q�ז�����iB�PZe���]�����l\���x�@6J�+�^�ܞ�����U��S�h���M�Q<�cUÈ(�O�X3���2m��������߇�,4��t�0��|iW)8؟�կ�ߥ�[��-����zyY�*�E`7�Z{����c�;�/taKT��<O?
g�"�i�͈�傜��\0ht���n'(���`3���y
�70Q+YyI�eI�m7k�M:��;��t,
�k�VhRJwH����n�S����_���4p��YW3�B�-X5C�A]{�\�	���$����+�+(\>ubH�3I��k����	^��W�&7�E�O�1�c��<�e72}(/���}������:��/⾒>t���:�P���=>G�<�1��[�d��c����H�](�]��pRx���<���Mf@�&#/0ntent("~/"));
            if (list != null && list.Any())
            {
                var pageSize = int.Parse(Common.GetConfigString("recPageSize"));
                var firstLoadNum = 2 * pageSize;
                model.ListRecommend = list.Take(firstLoadNum).ToList();
                model.PageCount = firstLoadNum > list.Count ? 0 : Convert.ToInt32(Math.Ceiling((double)list.Count / pageSize));
            }
            return View(model);
        }

    }
}
