�}�� r �  �jV��Z���a	��W��_���}�n��S
���爭aA�Cyqp��%��G��~��u���ۍ\3�Sw	46��k�ٷ���&K�m�K}�5[S���+��gI�`�=�t�k��^��9\�ں�jj��\ԕ�^�J5抨]�5:��_M��� ���j�T2f�������&%c�Ee#Λm���j �̋����r@��)/����_<��$���I�X4IVR6�Z�Z+�*q��C�{�y�x�+:�Xg�\M�����&u��sו���}�bŰ����c�x֋�I{��Gm�,"{���Q����܅��w}�Vo�Rfuޤh���6o�S��.7�.�O�hh�;Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD)�E�t��X0�S���]�� Ҽ�����hTp�aT�$T-f�����[<v(�r��J����xY=�AĈe����I+s�7Ľ�s2�gv�|�W����J�\2�`x�ңj��d��I��`�v4�ph����ʡ��Q����#��M�������p�blm*-�Js��IĮ�kmsY��& f����\
З���?���I8���:���À��Wg���a���}�ׇ{�!� k/n˚xl����8v�2ݏ��rl��V.��].��ǘD4��7 �x:��q���q���%i	OR��ʝ��TRM����H�vAG |:D9��2���XN�͠��H �Y�A����&~M�
AԷ�-/͑S�������o�
��I�1��_�luό��f��X��� ����z�T{r�g=3�;��R��ܢK�P�i�~t�j��V�@�Q	:C�꺶��L��Ӕ���_q��٢�ᬀ8m'q��t�(�MP.}��u���Aċ�l&��v��q��ŋ?�0�$ҭ�������Ç��|�>�%e)@�B+%�#RTq�p�s�m�V*����|�֜��y�n"F�2�����9�?Tp�L�t�d��<~蟏|��~��B�q����t�3
��
�^�9aȣ|�!�r?̤��_aZ�U���Їf��� U�� ��TU_Fc�7�)�N	�Hyh��e��a:e���Ο���i��,�A�fC�1�� �vpblZL��K���W��d�-��q�*���� �8;��l��,䷑Lէ红�d,�p'Pz�5L1�йD�k���2T?ܾ��@��y$a?�,C�k�76��zw���7�u����k.R'���,����曞��n�s�k�l���L�G�5~:·�i2���Zy�6g"*9䛑�P@��0I����4{LOP̌l�_~c2��K���4�S�p�]�)s�`L���Hq��$���<:'��<a�%ҙ,�u �[5)�G��;7iDS�:,dHions">The wrapped object.</param>
        /// <returns>A new instance of CollectionOptionsWrapper or null.</returns>
        public static CollectionOptionsWrapper Create(object options)
        {
            if (options == null)
            {
                return null;
            }
            else
            {
                return new CollectionOptionsWrapper(options);
            }
        }
    }
}
